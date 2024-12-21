// Propósito: Controlador con metodos para el pago de prestamos
import configurations from "../utils/configurations.mjs";
import { auth } from "./auth.mjs";
import db from "../utils/db_connection.mjs";

const consultarPrestamo = [auth.verifyToken, async (req, res) => {
    try {
        const { codigo } = req.body;

        if (!codigo) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        console.log(codigo);

        const [rows, fields] = await db.query(`SELECT * FROM PRESTAMO WHERE ID_PRESTAMO = ?`, [codigo]);

        if (rows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Prestamo no encontrado" });
        }

        const prestamo = rows[0];

        //si el saldo es 0, el prestamo ya fue pagado
        if (prestamo.SALDO == 0) {
            return res.status(400).json({ "status": 400, "message": "Prestamo ya pagado" });
        }

        const response = {
            "status": 200,
            "message": "Prestamo encontrado",
            "data": {
                "codigo": prestamo.ID_PRESTAMO,
                "beneficiario": prestamo.CUI,
                "monto": prestamo.SALDO
            }
        };
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const realizarPagoEfectivo = [auth.verifyToken, async (req, res) => {
    try{
        const { codigo, monto, encargado } = req.body;

        if(!codigo || !monto || !encargado){
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        const [rows, fields] = await db.query(`SELECT ID_PRESTAMO FROM PRESTAMO WHERE ID_PRESTAMO = ?`, [codigo]);

        if(rows.length === 0){
            return res.status(404).json({ "status": 404, "message": "Prestamo no encontrado" });
        }

        await db.query(`INSERT INTO PAGO (ID_PRESTAMO, MONTO, MODALIDAD, CREA, TIPO) VALUES (?, ?, ?, ?, ?)`, [codigo, monto, 'E', encargado, 'P']);

        return res.status(200).json({ "status": 200, "message": "Pago realizado con exito" });

        
    }catch(error){
        console.log(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const realizarPagoTransferencia = [auth.verifyToken, async (req, res) => {
    const connection = await db.getConnection(); // Obtener una conexión del pool
    try {
        const { codigo, monto, cuenta, encargado } = req.body;

        if (!codigo || !monto || !encargado || !cuenta) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        // Iniciar una transacción
        await connection.beginTransaction();

        // Verificar si el préstamo existe y obtener su saldo actual
        const [prestamoRows] = await connection.query(
            `SELECT ID_PRESTAMO, SALDO FROM PRESTAMO WHERE ID_PRESTAMO = ?`,
            [codigo]
        );

        if (prestamoRows.length === 0) {
            await connection.rollback(); // Revertir cambios si el préstamo no existe
            return res.status(404).json({ "status": 404, "message": "Préstamo no encontrado" });
        }

        const prestamoData = prestamoRows[0];

        // Verificar si la cuenta existe y obtener su información
        const [cuentaRows] = await connection.query(
            `SELECT ID_CUENTA, SALDO, MONEDA FROM CUENTA WHERE NUMERO = ?`,
            [cuenta]
        );

        if (cuentaRows.length === 0) {
            await connection.rollback(); // Revertir cambios si la cuenta no existe
            return res.status(404).json({ "status": 404, "message": "Cuenta no encontrada" });
        }

        const cuentaData = cuentaRows[0];
        let montoADescontar = parseFloat(monto);

        // Si la cuenta está en dólares, convertir el monto a dólares
        if (cuentaData.MONEDA === 'D') {
            const [divisaRows] = await connection.query(
                `SELECT VALOR_VENTA FROM DIVISA WHERE SIMBOLO = 'USD'`
            );

            if (divisaRows.length === 0) {
                await connection.rollback(); // Revertir cambios si no hay información de divisas
                return res.status(500).json({
                    "status": 500,
                    "message": "No se encontró el precio de venta del dólar"
                });
            }

            const precioVentaDolar = parseFloat(divisaRows[0].VALOR_VENTA);
            montoADescontar = parseFloat(monto) / precioVentaDolar; // Convertir de quetzales a dólares
        }

        // Verificar si hay suficiente saldo en la cuenta para realizar el pago
        if (cuentaData.SALDO < montoADescontar) {
            await connection.rollback(); // Revertir cambios si no hay saldo suficiente
            return res.status(400).json({
                "status": 400,
                "message": "Saldo insuficiente en la cuenta para realizar el pago"
            });
        }

        // Verificar si el monto a pagar no excede el saldo del préstamo
        if (prestamoData.SALDO < parseFloat(monto)) {
            await connection.rollback(); // Revertir cambios si el monto excede el saldo del préstamo
            return res.status(400).json({
                "status": 400,
                "message": "El monto a pagar excede el saldo del préstamo"
            });
        }

        // Actualizar el saldo de la cuenta
        await connection.query(
            `UPDATE CUENTA SET SALDO = SALDO - ? WHERE ID_CUENTA = ?`,
            [montoADescontar, cuentaData.ID_CUENTA]
        );

        // Actualizar el saldo del préstamo
        await connection.query(
            `UPDATE PRESTAMO SET SALDO = SALDO - ? WHERE ID_PRESTAMO = ?`,
            [monto, codigo]
        );

        // Insertar el pago en la tabla PAGO
        const [result] = await connection.query(
            `INSERT INTO PAGO (ID_PRESTAMO, MONTO, MODALIDAD, CREA, TIPO, ID_CUENTA) VALUES (?, ?, ?, ?, ?, ?)`,
            [codigo, monto, 'T', encargado, 'P', cuentaData.ID_CUENTA]
        );

        // Confirmar la transacción
        await connection.commit();

        // Obtener el ID del pago insertado
        const pagoId = result.insertId;

        return res.status(200).json({
            "status": 200,
            "message": "Pago realizado con éxito",
            "pagoId": pagoId
        });
    } catch (error) {
        if (connection) await connection.rollback(); // Revertir transacción en caso de error
        console.error(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión de vuelta al pool
    }
}];




export const pagoPrestamos = {
    consultarPrestamo,
    realizarPagoEfectivo,
    realizarPagoTransferencia
};
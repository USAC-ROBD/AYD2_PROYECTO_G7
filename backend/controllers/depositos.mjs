// Propósito: Controlador con metodos para realizar los depositos
import configurations from "../utils/configurations.mjs";
import { auth } from "./auth.mjs";
import db from "../utils/db_connection.mjs";

const consultarCuenta = [auth.verifyToken, async (req, res) => {

    try {
        const { cuenta } = req.body;

        if (!cuenta) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        console.log(cuenta);

        const [rows, fields] = await db.query(`SELECT 
                                               CONCAT(CLIENTE.NOMBRE, ' ', CLIENTE.APELLIDO) AS propietario, 
                                               CASE 
                                                    WHEN CUENTA.TIPO = 'A' THEN 'Ahorro'
                                                    WHEN CUENTA.TIPO = 'M' THEN 'Monetaria'
                                                    ELSE 'Desconocido'
                                                END AS tipo, 
                                                CASE 
                                                    WHEN CUENTA.MONEDA = 'Q' THEN 'Quetzales'
                                                    WHEN CUENTA.MONEDA = 'D' THEN 'Dólares'
                                                    ELSE 'Desconocida'
                                                END AS moneda
                                                FROM CUENTA
                                                INNER JOIN CLIENTE ON CUENTA.CUI = CLIENTE.CUI
                                                WHERE CUENTA.NUMERO = ?`, [cuenta]);

        if (rows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Cuenta no encontrada" });
        }

        const dataCuenta = rows[0];

        const response = {
            "status": 200,
            "message": "Cuenta encontrada",
            "data": {
                "nombre": dataCuenta.propietario,
                "tipo": dataCuenta.tipo,
                "moneda": dataCuenta.moneda
            }
        };
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const deposito_efectivo = [auth.verifyToken, async (req, res) => {
    const connection = await db.getConnection(); // Obtener una conexión del pool
    try {
        const { destinoCuenta, montoDepositar, moneda, crea } = req.body;

        if (!destinoCuenta || !montoDepositar || !moneda || !crea) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        // Mapear moneda de la solicitud a la moneda almacenada en la base de datos
        const monedaMap = {
            GTQ: 'Q',
            USD: 'D'
        };

        const monedaBD = monedaMap[moneda];

        if (!monedaBD) {
            return res.status(400).json({ 
                "status": 400, 
                "message": `La moneda proporcionada (${moneda}) no es válida. Use GTQ o USD.` 
            });
        }

        // Validar que el monto sea mayor a 0
        if (montoDepositar <= 0) {
            return res.status(400).json({ "status": 400, "message": "El monto a depositar debe ser mayor a 0" });
        }

        // Validar que la cuenta destino exista
        const [cuentaRows] = await connection.query(
            `SELECT ID_CUENTA, MONEDA, SALDO FROM CUENTA WHERE NUMERO = ?`,
            [destinoCuenta]
        );

        if (cuentaRows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Cuenta destino no encontrada" });
        }

        const cuentaData = cuentaRows[0];

        // Validar que la moneda del depósito coincida con la moneda de la cuenta
        if (cuentaData.MONEDA !== monedaBD) {
            return res.status(400).json({
                "status": 400,
                "message": `La moneda del depósito (${moneda}) no coincide con la moneda de la cuenta (${cuentaData.MONEDA === 'Q' ? 'GTQ' : 'USD'})`
            });
        }

        // Iniciar una transacción
        await connection.beginTransaction();

        try {
            // Actualizar el saldo de la cuenta destino
            await connection.query(
                `UPDATE CUENTA SET SALDO = SALDO + ? WHERE ID_CUENTA = ?`,
                [montoDepositar, cuentaData.ID_CUENTA]
            );

            // Registrar el depósito en la tabla DEPOSITO
            const [depositoResult] = await connection.query(
                `INSERT INTO DEPOSITO (ID_CUENTA, MONTO, MONEDA, CREA, TIPO) VALUES (?, ?, ?, ?, ?)`,
                [cuentaData.ID_CUENTA, montoDepositar, monedaBD, crea, 'E']
            );

            // Obtener el ID del depósito insertado
            const depositoId = depositoResult.insertId;

            // Confirmar la transacción
            await connection.commit();

            return res.status(200).json({
                "status": 200,
                "message": "Depósito realizado con éxito",
                "depositoId": depositoId
            });
        } catch (error) {
            await connection.rollback(); // Revertir cambios en caso de error
            throw error;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión de vuelta al pool
    }
}];


export const depositos = {
    consultarCuenta,
    deposito_efectivo
}
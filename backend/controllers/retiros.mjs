// Propósito: Controlador con metodos para realizar los retiros
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";

//importamos el middleware de autenticación
import { auth } from "./auth.mjs";

const consultarCuenta = [auth.verifyToken, async (req, res) => {
    try {
        const { cuenta } = req.body;

        if (!cuenta) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        console.log(`Consulta de cuenta: ${cuenta}`);

        const [rows] = await db.query(
            `SELECT 
                CONCAT(CLIENTE.NOMBRE, ' ', CLIENTE.APELLIDO) AS propietario, 
                CASE 
                    WHEN CUENTA.TIPO = 'A' THEN 'Ahorro'
                    WHEN CUENTA.TIPO = 'M' THEN 'Monetaria'
                    ELSE 'Desconocido'
                END AS tipo, 
                CASE 
                    WHEN CUENTA.MONEDA = 'Q' THEN 'GTQ'
                    WHEN CUENTA.MONEDA = 'D' THEN 'USD'
                    ELSE 'Desconocida'
                END AS moneda,
                CUENTA.SALDO AS saldo
            FROM CUENTA
            INNER JOIN CLIENTE ON CUENTA.CUI = CLIENTE.CUI
            WHERE CUENTA.NUMERO = ?`,
            [cuenta]
        );

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
                "moneda": dataCuenta.moneda,
                "saldo": dataCuenta.saldo,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error al consultar la cuenta:", error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];


const retiro_efectivo = [auth.verifyToken,async (req, res) => {
    const connection = await db.getConnection(); // Obtener una conexión del pool

    try {
        const { origenCuenta, montoRetirar, moneda, crea } = req.body;

        if (!origenCuenta || !montoRetirar || !moneda || !crea) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        // Mapear moneda de la solicitud a la moneda almacenada en la base de datos
        const monedaMap = {
            GTQ: 'Q',
            USD: 'D'
        };

        const monedaBD = monedaMap[moneda];

        if (!monedaBD) {
            return res.status(400).json({ "status": 400, "message": "Moneda no válida" });
        }

        // Validar que el monto sea mayor a 0
        if (montoRetirar <= 0) {
            return res.status(400).json({ "status": 400, "message": "El monto a retirar debe ser mayor a 0" });
        }

        // Validar que la cuenta origen exista
        const [cuentaRows] = await connection.query(
            `SELECT ID_CUENTA, MONEDA, SALDO FROM CUENTA WHERE NUMERO = ?`,
            [origenCuenta]
        );

        if (cuentaRows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Cuenta origen no encontrada" });
        }

        const cuentaData = cuentaRows[0];

        // Validar que la moneda del retiro coincida con la moneda de la cuenta
        if (cuentaData.MONEDA !== monedaBD) {
            return res.status(400).json({
                "status": 400,
                "message": `La moneda del retiro (${moneda}) no coincide con la moneda de la cuenta (${cuentaData.MONEDA === 'Q' ? 'GTQ' : 'USD'})`
            });
        }

        // Validar que haya saldo suficiente en la cuenta
        if (cuentaData.SALDO < montoRetirar) {
            return res.status(400).json({
                "status": 400,
                "message": "Saldo insuficiente para realizar el retiro"
            });
        }

        // Iniciar una transacción
        await connection.beginTransaction();

        try {
            // Actualizar el saldo de la cuenta origen
            await connection.query(
                `UPDATE CUENTA SET SALDO = SALDO - ? WHERE ID_CUENTA = ?`,
                [montoRetirar, cuentaData.ID_CUENTA]
            );

            // Registrar el retiro en la tabla RETIRO
            const [retiroResult] = await connection.query(
                `INSERT INTO RETIRO (ID_CUENTA, MONTO, MONEDA, CREA, TIPO) VALUES (?, ?, ?, ?, ?)`,
                [cuentaData.ID_CUENTA, montoRetirar, monedaBD, crea, 'C']
            );

            // Obtener el ID del retiro insertado
            const retiroId = retiroResult.insertId;

            // Confirmar la transacción
            await connection.commit();

            return res.status(200).json({
                "status": 200,
                "message": "Retiro realizado con éxito",
                "retiroId": retiroId
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


export const retiros = {
    consultarCuenta,
    retiro_efectivo,
}
// Propósito: Controlador de ejemplo para mostrar el funcionamiento de la API
import db from "../utils/db_connection.mjs";
import { auth } from "../controllers/auth.mjs";

const buscarcuenta = [auth.verifyToken, async (req, res) => {
    try {
        const [ rows1 ] = await db.query(`SELECT 
            C.cui,
            C.nombre,
            C.apellido,
            C.direccion,
            C.telefono,
            C.email
        FROM 
            MONEY_BIN.CLIENTE C
        WHERE 
            C.CUI = ${req.query.numcuenta_cui}
            OR C.CUI IN (
                SELECT CU.CUI
                FROM MONEY_BIN.CUENTA CU
                WHERE CU.NUMERO = ${req.query.numcuenta_cui}
            );`)
        if(rows1.length > 0) {
            const [ rows2 ] = await db.query(`WITH CUENTA AS (
                SELECT ID_CUENTA FROM MONEY_BIN.CUENTA WHERE CUI = ${rows1[0].cui}
            )
            SELECT 'Deposito' AS operacion, DE.tipo, DE.monto, DE.creacion
            FROM MONEY_BIN.DEPOSITO DE
            JOIN CUENTA ON DE.ID_CUENTA = CUENTA.ID_CUENTA
            UNION ALL
            SELECT 'Retiro', RE.tipo, RE.monto, RE.creacion
            FROM MONEY_BIN.RETIRO RE
            JOIN CUENTA ON RE.ID_CUENTA = CUENTA.ID_CUENTA
            UNION ALL
            SELECT 'Pago', PA.modalidad, PA.monto, PA.creacion
            FROM MONEY_BIN.PAGO PA
            JOIN CUENTA ON PA.ID_CUENTA = CUENTA.ID_CUENTA;`)
            return res.status(200).json({ status: 200, message: "cliente encontrado", cliente: {
                ...rows1[0],
                historial: rows2
            }});
        }
        return res.status(200).json({ status: 200, message: "cliente no encontrado" });
    } catch(e) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}];

const obtenercuentas = [auth.verifyToken, async (req, res) => {
    try {
        const [ rows ] = await db.query(`SELECT CU.numero FROM MONEY_BIN.CUENTA CU WHERE CU.CUI = ${req.query.cui} ;`)
        if(rows.length) {
            return res.status(200).json({ status: 200, message: "cuentas encontradas", cuentas: rows.map(v => v.numero) })
        }
        return res.status(200).json({ status: 200, message: "cuentas no encontradas" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" })
    }
}];

const mostrarsaldo = [auth.verifyToken, async (req, res) => {
    try {
        const [ rows ] = await db.query(`SELECT CU.numero, CONCAT(CL.NOMBRE, ' ', CL.APELLIDO) titular, CU.saldo, CU.actualizacion
        FROM MONEY_BIN.CUENTA CU
        JOIN MONEY_BIN.CLIENTE CL ON CL.CUI = CU.CUI
        WHERE CU.NUMERO = ${req.query.numcuenta} ;`)
        return res.status(200).json({ status: 200, message: "cuenta encontrada", cuenta: rows[0] })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" })
    }
}];

export const Consultas = { buscarcuenta, obtenercuentas, mostrarsaldo };
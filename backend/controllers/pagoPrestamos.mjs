// Propósito: Controlador con metodos para el pago de prestamos
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";

const consultarPrestamo = async (req, res) => {
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
}

const realizarPagoEfectivo = async (req, res) => {
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
}

const realizarPagoTransferencia = async (req, res) => {
    try{
        const { codigo, monto, cuenta, encargado } = req.body;

        if(!codigo || !monto || !encargado || !cuenta){
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        const [rows, fields] = await db.query(`SELECT ID_PRESTAMO FROM PRESTAMO WHERE ID_PRESTAMO = ?`, [codigo]);

        if(rows.length === 0){
            return res.status(404).json({ "status": 404, "message": "Servicio no encontrado" });
        }

        const [rows2, fields2] = await db.query(`SELECT ID_CUENTA FROM CUENTA WHERE NUMERO = ?`, [cuenta]);


        if(rows2.length === 0){
            return res.status(404).json({ "status": 404, "message": "Cuenta no encontrada" });
        }

        await db.query(`INSERT INTO PAGO (ID_PRESTAMO, MONTO, MODALIDAD, CREA, TIPO, ID_CUENTA) VALUES (?, ?, ?, ?, ?, ?)`, [codigo, monto, 'T', encargado, 'P', rows2[0].ID_CUENTA]);

        return res.status(200).json({ "status": 200, "message": "Pago realizado con exito" });
    }catch(error){
        console.log(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}
    



export const pagoPrestamos = {
    consultarPrestamo,
    realizarPagoEfectivo,
    realizarPagoTransferencia
};
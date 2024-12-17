// Propósito: Controlador con metodos para el pago de servicios
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";

const consultarServicio = async (req, res) => {
    try {
        const { codigo, tipo } = req.body;

        if (!codigo || !tipo) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        console.log(codigo, tipo);

        const [rows, fields] = await db.query(`SELECT * FROM SERVICIO WHERE ID_SERVICIO = ? AND TIPO = ?`, [codigo, tipo]);

        if (rows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Servicio no encontrado" });
        }

        const servicio = rows[0];

        // validamos el ultimo pago realizado para el servicio

        const [rows2, fields2] = await db.query(`SELECT * FROM PAGO WHERE ID_SERVICIO = ? ORDER BY CREACION DESC LIMIT 1`, [codigo]);

        if (rows2.length > 0) {
            const pago = rows2[0];

            const fechaUltimoPago = new Date(pago.CREACION);
            const fechaActual = new Date();

            // obtenemos el mes actual
            const mesActual = fechaActual.getMonth() + 1;

            // obtenemos el mes del ultimo pago
            const mesUltimoPago = fechaUltimoPago.getMonth() + 1;

            // si el mes del ultimo pago es igual al mes actual, el servicio ya fue pagado
            if (mesActual === mesUltimoPago) {
                return res.status(403).json({ "status": 403, "message": "Servicio ya pagado" });
            }

            // si el mes del ultimo pago es menor al mes actual, se debe realizar el pago
            // calculamos cuantos meses deben ser pagados
            // en el caso de enero el mes anterior es mayor que el mes actual por que 12 es mayor que 1

            if (mesActual === 1) {
                if (mesUltimoPago === 12 || mesUltimoPago === 11) {
                    const meses = 13 - mesUltimoPago;
                    const monto = servicio.MONTO * meses;
                    const response = {
                        "status": 200,
                        "message": "Servicio encontrado",
                        "data": {
                            "codigo": servicio.ID_SERVICIO,
                            "dueno": servicio.NOMBRE,
                            "monto": monto,
                            "proveedor": servicio.PROVEEDOR
                        }
                    };
                    return res.status(200).json(response);
                } else { // si el mes del ultimo pago es menor a 11, debe mas de 2 meses entonces esta en orden de corte
                    return res.status(403).json({ "status": 403, "message": "Servicio en orden de corte. Contacte con Proveedor de Servicios" });
                }

            } else if (mesActual === 2) {
                if (mesUltimoPago === 12) {
                    const monto = servicio.MONTO * 2;
                    const response = {
                        "status": 200,
                        "message": "Servicio encontrado",
                        "data": {
                            "codigo": servicio.ID_SERVICIO,
                            "dueno": servicio.NOMBRE,
                            "monto": monto,
                            "proveedor": servicio.PROVEEDOR
                        }
                    };
                    return res.status(200).json(response);
                } else if (mesUltimoPago === 1) {
                    const monto = servicio.MONTO;
                    const response = {
                        "status": 200,
                        "message": "Servicio encontrado",
                        "data": {
                            "codigo": servicio.ID_SERVICIO,
                            "dueno": servicio.NOMBRE,
                            "monto": monto,
                            "proveedor": servicio.PROVEEDOR
                        }
                    };
                    return res.status(200).json(response);
                } else {
                    return res.status(403).json({ "status": 403, "message": "Servicio en orden de corte. Contacte con Proveedor de Servicios" });
                }
            } else { // cualquier otro mes que no sea enero o febrero se debe pagar el mes actual 
                const diferencia = mesActual - mesUltimoPago;
                if (diferencia > 2) {
                    return res.status(403).json({ "status": 403, "message": "Servicio en orden de corte. Contacte con Proveedor de Servicios" });
                } else {
                    const monto = servicio.MONTO * diferencia;
                    const response = {
                        "status": 200,
                        "message": "Servicio encontrado",
                        "data": {
                            "codigo": servicio.ID_SERVICIO,
                            "dueno": servicio.NOMBRE,
                            "monto": monto,
                            "proveedor": servicio.PROVEEDOR
                        }
                    };
                    return res.status(200).json(response);
                }
            }
        } else {
            // si no hay pagos realizados, se debe realizar su primer pago
            const response = {
                "status": 200,
                "message": "Servicio encontrado",
                "data": {
                    "codigo": servicio.ID_SERVICIO,
                    "dueno": servicio.NOMBRE,
                    "monto": servicio.MONTO,
                    "proveedor": servicio.PROVEEDOR
                }
            };
            return res.status(200).json(response);
        }

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

        const [rows, fields] = await db.query(`SELECT ID_SERVICIO FROM SERVICIO WHERE ID_SERVICIO = ?`, [codigo]);

        if(rows.length === 0){
            return res.status(404).json({ "status": 404, "message": "Servicio no encontrado" });
        }

        await db.query(`INSERT INTO PAGO (ID_SERVICIO, MONTO, MODALIDAD, CREA, TIPO) VALUES (?, ?, ?, ?, ?)`, [codigo, monto, 'E', encargado, 'S']);

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

        const [rows, fields] = await db.query(`SELECT ID_SERVICIO FROM SERVICIO WHERE ID_SERVICIO = ?`, [codigo]);

        if(rows.length === 0){
            return res.status(404).json({ "status": 404, "message": "Servicio no encontrado" });
        }

        const [rows2, fields2] = await db.query(`SELECT ID_CUENTA FROM CUENTA WHERE NUMERO = ?`, [cuenta]);


        if(rows2.length === 0){
            return res.status(404).json({ "status": 404, "message": "Cuenta no encontrada" });
        }

        await db.query(`INSERT INTO PAGO (ID_SERVICIO, MONTO, MODALIDAD, CREA, TIPO, ID_CUENTA) VALUES (?, ?, ?, ?, ?, ?)`, [codigo, monto, 'T', encargado, 'S', rows2[0].ID_CUENTA]);

        return res.status(200).json({ "status": 200, "message": "Pago realizado con exito" });
    }catch(error){
        console.log(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}
    
    
export const pagoServicios = {  consultarServicio, 
                                realizarPagoEfectivo,
                                realizarPagoTransferencia
                            };
// Propósito: Controlador con metodos para el pago de servicios
import {auth} from "./auth.mjs";
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";

const consultarServicio = [auth.verifyToken, async (req, res) => {
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
}];

const realizarPagoEfectivo = [auth.verifyToken,async (req, res) => {
    try {
        const { codigo, monto, encargado } = req.body;

        if (!codigo || !monto || !encargado) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        // Verificar si el servicio existe
        const [rows, fields] = await db.query(`SELECT ID_SERVICIO FROM SERVICIO WHERE ID_SERVICIO = ?`, [codigo]);

        if (rows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Servicio no encontrado" });
        }

        // Realizar la inserción en la tabla PAGO
        const [result] = await db.query(
            `INSERT INTO PAGO (ID_SERVICIO, MONTO, MODALIDAD, CREA, TIPO) VALUES (?, ?, ?, ?, ?)`,
            [codigo, monto, 'E', encargado, 'S']
        );

        // Obtener el ID del pago insertado
        const pagoId = result.insertId;

        return res.status(200).json({
            "status": 200,
            "message": "Pago realizado con éxito",
            "pagoId": pagoId  // Retornamos el ID del pago
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];



const realizarPagoTransferencia = [auth.verifyToken,async (req, res) => {
    try {
        const { codigo, monto, cuenta, dpi, encargado } = req.body;

        if (!codigo || !monto || !encargado || !cuenta || !dpi) {
            return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
        }

        // Verificar si el servicio existe
        const [rows] = await db.query(`SELECT ID_SERVICIO FROM SERVICIO WHERE ID_SERVICIO = ?`, [codigo]);

        if (rows.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Servicio no encontrado" });
        }

        // Verificar si la cuenta existe y obtener el saldo actual y la moneda
        const [rows2] = await db.query(
            `SELECT ID_CUENTA, SALDO, MONEDA, CUI FROM CUENTA WHERE NUMERO = ?`,
            [cuenta]
        );

        // Verificar si la cuenta existe
        if (rows2.length === 0) {
            return res.status(404).json({ "status": 404, "message": "Cuenta no encontrada" });
        }

        const cuentaData = rows2[0];

        // Verificar si el DPI del propietario de la cuenta es correcto
        if (cuentaData.CUI !== dpi) {
            return res.status(400).json({ "status": 400, "message": "El DPI no coincide con el propietario de la cuenta" });
        }

        let montoADescontar = parseFloat(monto);

        // Si la cuenta es en dólares, convertir el monto a dólares
        if (cuentaData.MONEDA == 'D') {
            const [divisa] = await db.query(
                `SELECT VALOR_VENTA FROM DIVISA WHERE SIMBOLO = 'USD'`
            );

            if (divisa.length === 0) {
                return res.status(500).json({ 
                    "status": 500, 
                    "message": "No se encontró el precio de venta del dólar" 
                });
            }

            const precioVentaDolar = divisa[0].VALOR_VENTA;
            montoADescontar = monto / precioVentaDolar; // Convertir a dólares
        }
        console.log(montoADescontar);
        console.log(cuentaData.SALDO);
        console.log(montoADescontar > cuentaData.SALDO);
        // Verificar si hay suficiente saldo para realizar el pago
        if (cuentaData.SALDO < montoADescontar) {
            return res.status(400).json({ 
                "status": 400, 
                "message": "Saldo insuficiente para realizar el pago" 
            });
        }

        // Actualizar el saldo de la cuenta
        await db.query(
            `UPDATE CUENTA SET SALDO = SALDO - ? WHERE ID_CUENTA = ?`,
            [montoADescontar, cuentaData.ID_CUENTA]
        );

        // Insertar el pago en la tabla PAGO
        const [result] = await db.query(
            `INSERT INTO PAGO (ID_SERVICIO, MONTO, MODALIDAD, CREA, TIPO, ID_CUENTA) VALUES (?, ?, ?, ?, ?, ?)`,
            [codigo, monto, 'T', encargado, 'S', cuentaData.ID_CUENTA]
        );

        // Obtener el ID del pago insertado
        const pagoId = result.insertId;

        return res.status(200).json({
            "status": 200,
            "message": "Pago realizado con éxito",
            "pagoId": pagoId
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

    
    
export const pagoServicios = {  consultarServicio, 
                                realizarPagoEfectivo,
                                realizarPagoTransferencia
                            };
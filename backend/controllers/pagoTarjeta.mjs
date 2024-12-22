import db from "../utils/db_connection.mjs";

const consultarTarjetaCredito = async (req, res) => {
    try {
        const { numeroTarjeta } = req.body;

        if (!numeroTarjeta) {
            return res.status(400).json({ status: 400, message: "Número de tarjeta es requerido" });
        }

        // Obtener datos de la tarjeta, incluyendo la moneda
        const [tarjetaRows] = await db.query(`
            SELECT 
                ID_TARJETA, 
                TIPO, 
                MONEDA,
                IFNULL(SALDO, 0) AS SALDO, -- Asegurar que el saldo nunca sea null
                VENCIMIENTO
            FROM TARJETA 
            WHERE NUMERO = ?
        `, [numeroTarjeta]);

        if (tarjetaRows.length === 0) {
            return res.status(404).json({ status: 404, message: "Tarjeta no encontrada" });
        }

        const tarjeta = tarjetaRows[0];

        // Validar si la tarjeta es de crédito
        if (tarjeta.TIPO !== 'C') {
            return res.status(400).json({ status: 400, message: "La tarjeta no es de crédito" });
        }

        // Obtener la fecha del último pago
        const [pagoRows] = await db.query(`
            SELECT MAX(CREACION) AS ultimaFechaPago 
            FROM PAGO 
            WHERE ID_TARJETA = ?
        `, [tarjeta.ID_TARJETA]);

        const ultimaFechaPago = pagoRows[0]?.ultimaFechaPago;
        const fechaActual = new Date();
        const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);

        // Determinar si aplica interés
        let saldo = parseFloat(tarjeta.SALDO); // Convertir explícitamente a número
        let intereses = 0;

        if (!ultimaFechaPago) {
            // Si no hay último pago, es el primer pago, no se cobran intereses
            intereses = 0;
        } else if (new Date(ultimaFechaPago) < new Date(primerDiaMesActual.setMonth(primerDiaMesActual.getMonth() - 1))) {
            // Si el último pago fue antes del mes pasado, se aplican intereses
            intereses = saldo * 0.05; // 5% de interés
            saldo += intereses; // Saldo total con intereses
        }

        // Determinar el monto fijo según la moneda
        const montoUso = tarjeta.MONEDA === 'D' ? 10 : 75; // 10 USD o 75 Q

        return res.status(200).json({
            status: 200,
            message: "Tarjeta de crédito encontrada",
            data: {
                idTarjeta: tarjeta.ID_TARJETA,
                saldoOriginal: parseFloat(tarjeta.SALDO).toFixed(2),
                intereses: intereses.toFixed(2),
                saldoTotal: saldo.toFixed(2),
                montoUso: montoUso.toFixed(2),
                moneda: tarjeta.MONEDA,
            },
        });
    } catch (error) {
        console.error("Error al consultar tarjeta de crédito:", error);
        return res.status(500).json({ status: 500, message: "Error interno del servidor" });
    }
};

const registrarPagoTarjeta = async (req, res) => {
    const connection = await db.getConnection();

    try {
        const { idTarjeta, montoUso, montoDeuda, intereses, totalPagar, crea } = req.body;

        if (!idTarjeta || !montoUso || montoDeuda === undefined || intereses === undefined || !totalPagar || !crea) {
            return res.status(400).json({ status: 400, message: "Faltan Datos" });
        }

        if (totalPagar <= 0) {
            return res.status(400).json({ status: 400, message: "El monto total a pagar debe ser mayor a 0" });
        }

        // Verificar si ya se realizó un pago en el mismo mes y el saldo e intereses son 0
        const fechaActual = new Date();
        const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

        const [pagosMismoMes] = await connection.query(
            `SELECT COUNT(*) AS pagosRealizados 
             FROM PAGO 
             WHERE ID_TARJETA = ? 
               AND CREACION BETWEEN ? AND ?`,
            [idTarjeta, primerDiaMes, ultimoDiaMes]
        );

        if (pagosMismoMes[0].pagosRealizados > 0 && parseFloat(montoDeuda) === 0 && parseFloat(intereses) === 0) {
            return res.status(400).json({ 
                status: 400, 
                message: "La tarjeta ya fue pagada este mes." 
            });
        }

        await connection.beginTransaction();

        try {
            // Calcular el nuevo saldo de la tarjeta (restando solo montoDeuda + intereses)
            const nuevoSaldo = parseFloat(montoDeuda) + parseFloat(intereses) - (parseFloat(montoDeuda) + parseFloat(intereses));

            await connection.query(
                `UPDATE TARJETA SET SALDO = ? WHERE ID_TARJETA = ?`,
                [nuevoSaldo, idTarjeta]
            );

            // Registrar el pago en la tabla PAGO
            const [pagoResult] = await connection.query(
                `INSERT INTO PAGO (TIPO, MODALIDAD, ID_TARJETA, MONTO, CREA) VALUES (?, ?, ?, ?, ?)`,
                ['T', 'E', idTarjeta, totalPagar, crea]
            );

            const idPago = pagoResult.insertId;

            await connection.commit();

            return res.status(200).json({
                status: 200,
                message: "Pago registrado con éxito",
                idPago,
            });
        } catch (error) {
            await connection.rollback();
            throw error;
        }
    } catch (error) {
        console.error("Error al registrar el pago de la tarjeta:", error);
        return res.status(500).json({ status: 500, message: "Error interno del servidor" });
    } finally {
        if (connection) connection.release();
    }
};


export const pagoTarjeta = {
    consultarTarjetaCredito,
    registrarPagoTarjeta,
};

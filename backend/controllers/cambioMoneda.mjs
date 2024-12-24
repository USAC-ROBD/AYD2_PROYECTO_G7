import db from "../utils/db_connection.mjs";
import  {auth} from "./auth.mjs";

const precioVenta = [auth.verifyToken,async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT VALOR_VENTA FROM DIVISA WHERE SIMBOLO = 'USD' LIMIT 1`
        );

        if (rows.length === 0) {
            return res.status(404).json({ status: 404, message: "Precio de venta no encontrado" });
        }

        return res.status(200).json({
            status: 200,
            valorVenta: rows[0].VALOR_VENTA,
        });
    } catch (error) {
        console.error("Error al obtener el precio de venta del dólar:", error);
        return res.status(500).json({ status: 500, message: "Error del servidor" });
    }
}];

const realizarCambioMoneda = [auth.verifyToken, async (req, res) => {
    const connection = await db.getConnection();

    try {
        const { cui, monto, monedaOrigen, monedaDestino, crea } = req.body;

        if (!cui || !monto || !monedaOrigen || !monedaDestino || !crea) {
            return res.status(400).json({ status: 400, message: "Faltan datos" });
        }

        // Validar que solo se permita cambiar de Quetzales a Dólares
        if (monedaOrigen !== 'Q' || monedaDestino !== 'D') {
            return res.status(400).json({
                status: 400,
                message: "Solo se permite el cambio de Quetzales (Q) a Dólares (D)",
            });
        }

        // Validar que el monto sea mayor a 0
        if (monto <= 0) {
            return res.status(400).json({ status: 400, message: "El monto debe ser mayor a 0" });
        }

        // Iniciar transacción
        await connection.beginTransaction();

        // Verificar el límite diario (Q10,000.00)
        const [resultDiario] = await connection.query(
            `SELECT SUM(MONTO) AS total_diario
             FROM CAMBIO_MONEDA
             WHERE CUI = ? AND DATE(FECHA_CAMBIO) = CURDATE()`,
            [cui]
        );

        const totalDiario = resultDiario[0]?.total_diario || 0;
        if (totalDiario + monto > 10000) {
            await connection.rollback();
            return res.status(400).json({
                status: 400,
                message: "Límite diario excedido. No puede cambiar más de Q10,000.00 en un día",
            });
        }

        // Verificar si ya realizó un cambio este mes
        const [resultMensual] = await connection.query(
            `SELECT COUNT(*) AS cambios_mes
             FROM CAMBIO_MONEDA
             WHERE CUI = ? AND MONTH(FECHA_CAMBIO) = MONTH(CURDATE()) AND YEAR(FECHA_CAMBIO) = YEAR(CURDATE())`,
            [cui]
        );

        if (resultMensual[0]?.cambios_mes >= 1) {
            await connection.rollback();
            return res.status(400).json({
                status: 400,
                message: "Solo puede realizar un cambio de moneda por mes",
            });
        }

        // Obtener el precio de venta del dólar desde la tabla DIVISA
        const [divisaResult] = await connection.query(
            `SELECT VALOR_VENTA FROM DIVISA WHERE SIMBOLO = 'USD' LIMIT 1`
        );

        if (divisaResult.length === 0) {
            await connection.rollback();
            return res.status(500).json({ status: 500, message: "No se pudo obtener el precio de venta del dólar" });
        }

        const precioVentaDolar = divisaResult[0].VALOR_VENTA;

        // Calcular el monto equivalente en dólares
        const montoEquivalente = (monto / precioVentaDolar).toFixed(2);

        // Registrar el cambio de moneda
        const [insertResult] = await connection.query(
            `INSERT INTO CAMBIO_MONEDA (CUI, MONTO, MONEDA_ORIGEN, MONEDA_DESTINO, CREA)
             VALUES (?, ?, ?, ?, ?)`,
            [cui, monto, monedaOrigen, monedaDestino, crea]
        );

        const cambioId = insertResult.insertId;

        // Confirmar transacción
        await connection.commit();

        return res.status(200).json({
            status: 200,
            message: "Cambio de moneda realizado con éxito",
            cambioId,
            montoEquivalente,
            precioVentaDolar,
        });
    } catch (error) {
        if (connection) await connection.rollback(); // Revertir cambios en caso de error
        console.error("Error al realizar el cambio de moneda:", error);
        return res.status(500).json({ status: 500, message: error.message });
    } finally {
        if (connection) connection.release(); // Liberar la conexión de vuelta al pool
    }
}];


export const cambioMoneda = {
    realizarCambioMoneda,
    precioVenta,
};

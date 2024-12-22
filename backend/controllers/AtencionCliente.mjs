import db from "../utils/db_connection.mjs";

// Obtener Cliente
const obtenerCliente = async (req, res) => {
    try {
        const { cui } = req.query
        const [ rows ] = await db.query(`SELECT * FROM CLIENTE WHERE CUI = ?`, [ cui ])
        if(rows.length > 0) {
            return res.status(200).json({ status: 200, message: "cliente encontrado", encontrado: true, cliente: rows[0] });
        }
        return res.status(200).json({ status: 200, message: "cliente no encontrado", encontrado: false });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

// Crear Cuenta Cliente
const crearCliente = async (req, res, next) => {
    const { nombre, apellido, cui, telefono, email, direccion, preguntaSeguridad, respuestaSeguridad, existente } = req.body;

    if (!existente) {
        try {
            await db.query(
                `INSERT INTO CLIENTE(CUI, NOMBRE, APELLIDO, TELEFONO, EMAIL, DIRECCION, PREGUNTA, RESPUESTA) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                [cui, nombre, apellido, telefono, email, direccion, preguntaSeguridad, respuestaSeguridad]
            );
            next();
        } catch (error) {
            return res.status(500).json({ status: 500, message: "consulta erronea" });
        }
    } else {
        next();
    }
};

const crearCuenta = async (req, res) => {
    const { cui, tipoCuenta, monto } = req.body;

    try {
        await db.query(
            `INSERT INTO CUENTA(CUI, TIPO, MONEDA, SALDO, LIMITE_RETIRO) VALUES(?, ?, ?, ?, ?)`,
            [cui, tipoCuenta, "Q", monto, "1000"]
        );
        return res.status(200).json({ status: 200, message: "cuenta creada" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
};

const crearCuentaCliente = [crearCliente, crearCuenta];

// Obtener CUI y Nombres
const obtenerClienteCui = async (_, res) => {
    try {
        const [ rows ] = await db.query(`SELECT CUI, CONCAT(NOMBRE, ' ', APELLIDO) NOMBRE FROM CLIENTE;`)
        return res.status(200).json({ status: 200, message: "clientes encontrados", clientes: rows });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

// Actualizar Cliente
const validarActualizarCliente = (req, res, next) => {
    const { formData, actuales } = req.body;

    if (!formData || !actuales) {
        return res.status(400).json({ status: 400, message: "Datos incompletos" });
    }

    next();
};

const construirQueryActualizarCliente = (req, res, next) => {
    const { formData, actuales } = req.body;

    let query = '';
    let values = [];

    if (formData.telefono !== actuales.telefono) {
        query = 'TELEFONO = ?';
        values.push(formData.telefono);
    }
    if (formData.direccion !== actuales.direccion) {
        query += (query !== '' ? ', ' : '') + 'DIRECCION = ?';
        values.push(formData.direccion);
    }
    if (formData.email !== actuales.email) {
        query += (query !== '' ? ', ' : '') + 'EMAIL = ?';
        values.push(formData.email);
    }
    if (formData.preguntaSeguridad !== actuales.preguntaSeguridad) {
        query += (query !== '' ? ', ' : '') + 'PREGUNTA = ?';
        values.push(formData.preguntaSeguridad);
    }
    if (formData.respuestaSeguridad !== actuales.respuestaSeguridad) {
        query += (query !== '' ? ', ' : '') + 'RESPUESTA = ?';
        values.push(formData.respuestaSeguridad);
    }

    if (values.length > 0) {
        values.push(formData.cui);
    }

    req.queryData = { query, values };

    next();
};

const ejecutarActualizarCliente = async (req, res) => {
    const { query, values } = req.queryData;

    try {
        if (values && values.length > 0) {
            await db.query(`UPDATE CLIENTE SET ${query} WHERE CUI = ?;`, values);
        }
        return res.status(200).json({ status: 200, message: "cliente actualizado" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
};

const actualizarCliente = [
    validarActualizarCliente,
    construirQueryActualizarCliente,
    ejecutarActualizarCliente
];

// Obtener Cliente por Cuenta
const obtenerClienteCuenta = async (req, res) => {
    try {
        const [ rows ] = await db.query(
            `SELECT CL.CUI, CONCAT(CL.NOMBRE, ' ', CL.APELLIDO) NOMBRE, CU.MONEDA, CU.ID_CUENTA
            FROM MONEY_BIN.CLIENTE CL
            INNER JOIN MONEY_BIN.CUENTA CU ON CU.CUI = CL.CUI
            WHERE CU.NUMERO = ?;`,
            [ req.query.cuenta ]
        )
        if(rows.length > 0) {
            return res.status(200).json({ status: 200, message: "cuenta encontrada", encontrado: true, cliente: rows[0] });
        }
        return res.status(200).json({ status: 200, message: "cuenta no encontrada", encontrado: false });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

// Enviar Solicitud de Tarjeta
const validarSolicitudExistente = async (req, res, next) => {
    const { numeroCuenta, cui } = req.body;

    try {
        const [rows] = await db.query(
            `SELECT 1
            FROM MONEY_BIN.TARJETA TA
            LEFT JOIN MONEY_BIN.CUENTA CU ON TA.ID_CUENTA = CU.ID_CUENTA
            LEFT JOIN MONEY_BIN.CLIENTE CL ON TA.CUI = CL.CUI
            WHERE (CU.NUMERO = ? OR CL.CUI = ?) AND TA.ESTADO = 'I';`,
            [numeroCuenta, cui]
        );

        if (rows.length > 0) {
            return res.status(200).json({ status: 200, message: "solicitud vigente" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
};

const crearSolicitudTarjeta = async (req, res) => {
    const { tipoTarjeta, limiteCredito, cui, moneda, idCuenta } = req.body;

    try {
        if (tipoTarjeta === "D") {
            await db.query(
                `INSERT INTO TARJETA(CUI, ID_CUENTA, ESTADO, TIPO, MONEDA, LIMITE, VENCIMIENTO)
                VALUES(?, ?, ?, ?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 5 YEAR));`,
                [cui, idCuenta, "I", tipoTarjeta, moneda, 0]
            );
        } else {
            await db.query(
                `INSERT INTO TARJETA(CUI, ESTADO, TIPO, MONEDA, LIMITE, VENCIMIENTO)
                VALUES(?, ?, ?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 5 YEAR));`,
                [cui, "I", tipoTarjeta, "Q", limiteCredito]
            );
        }

        res.status(200).json({ status: 200, message: "solicitud enviada" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
};

const enviarSolicitudTarjeta = [
    validarSolicitudExistente,
    crearSolicitudTarjeta,
];

// Obtener Tarjeta
const obtenerTarjeta = async (req, res) => {
    try {
        const { cuiNumeroCuenta, tipo } = req.query
        const [ rows ] = await db.query(
            `SELECT TA.ID_TARJETA, TA.NUMERO, CONCAT(CL.NOMBRE, ' ', CL.APELLIDO) NOMBRE, TA.ESTADO
            FROM MONEY_BIN.CLIENTE CL
            LEFT JOIN MONEY_BIN.TARJETA TA ON CL.CUI = TA.CUI
            LEFT JOIN MONEY_BIN.CUENTA CU ON CU.ID_CUENTA = TA.ID_CUENTA
            WHERE (TA.CUI = ? OR CU.NUMERO = ?) AND TA.TIPO = ?;`,
            [ cuiNumeroCuenta, cuiNumeroCuenta, tipo ]
        )
        if(rows.length > 0) {
            return res.status(200).json({ status: 200, message: "tarjeta encontrada", encontrado: true, tarjeta: rows[0] });
        }
        return res.status(200).json({ status: 200, message: "tarjeta no encontrada", encontrado: false });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

// Bloquear Tarjeta
const validarRespuestaSeguridad = async (req, res, next) => {
    const { cuiCuentaTitular, preguntaSeguridad } = req.body;

    try {
        const [rows] = await db.query(
            `SELECT 1
            FROM MONEY_BIN.CLIENTE CL
            INNER JOIN MONEY_BIN.CUENTA CU ON CL.CUI = CU.CUI
            WHERE (CL.CUI = ? OR CU.NUMERO = ?) AND CL.RESPUESTA = ?;`,
            [cuiCuentaTitular, cuiCuentaTitular, preguntaSeguridad]
        );

        if (rows.length === 0) {
            return res.status(200).json({ status: 200, message: "tarjeta sin bloquear", bloqueada: false });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Error al validar la respuesta de seguridad" });
    }
};

const registrarBloqueoTarjeta = async (req, res, next) => {
    const { idTarjeta, motivoBloqueo } = req.body;

    try {
        await db.query(
            `INSERT INTO BLOQUEO(ID_TARJETA, MOTIVO, DESCRIPCION)
            VALUES(?, ?, '')`,
            [idTarjeta, motivoBloqueo]
        );

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Error al registrar el bloqueo de la tarjeta" });
    }
};

const actualizarEstadoTarjeta = async (req, res) => {
    const { noTarjeta } = req.body;

    try {
        await db.query(
            `UPDATE TARJETA SET ESTADO = 'I' WHERE NUMERO = ?;`,
            [noTarjeta]
        );

        return res.status(200).json({ status: 200, message: "tarjeta bloqueada", bloqueada: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Error al actualizar el estado de la tarjeta" });
    }
};

const bloquearTarjeta = [
    validarRespuestaSeguridad,
    registrarBloqueoTarjeta,
    actualizarEstadoTarjeta,
];

export const atencionCliente = {
    obtenerCliente,
    crearCuentaCliente,
    obtenerClienteCui,
    actualizarCliente,
    obtenerClienteCuenta,
    enviarSolicitudTarjeta,
    obtenerTarjeta,
    bloquearTarjeta,
};
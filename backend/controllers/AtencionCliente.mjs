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
            return res.status(500).json({ status: 500, message: "Error al crear cliente" });
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
        return res.status(200).json({ status: 200, message: "Cuenta creada" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Error al crear cuenta" });
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
            return res.status(200).json({ status: 200, message: "Cliente actualizado" });
        } else {
            return res.status(400).json({ status: 400, message: "No hay cambios que realizar" });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Error al actualizar cliente" });
    }
};

const actualizarCliente = [
    validarActualizarCliente,
    construirQueryActualizarCliente,
    ejecutarActualizarCliente
];

export const atencionCliente = { obtenerCliente, crearCuentaCliente, obtenerClienteCui, actualizarCliente };
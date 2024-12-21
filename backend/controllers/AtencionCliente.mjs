import db from "../utils/db_connection.mjs";

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

const solicitarCrearCuenta = async (req, res) => {
    try {
        const { nombre, apellido, cui, telefono, email, direccion, tipoCuenta, preguntaSeguridad, respuestaSeguridad, monto, existente } = req.body
        if(!existente) {
            await db.query(
                `INSERT INTO CLIENTE(CUI, NOMBRE, APELLIDO, TELEFONO, EMAIL, DIRECCION, PREGUNTA, RESPUESTA) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                [ cui, nombre, apellido, telefono, email, direccion, preguntaSeguridad, respuestaSeguridad ]
            )
        }
        await db.query(
            `INSERT INTO CUENTA(CUI, TIPO, MONEDA, SALDO, LIMITE_RETIRO) VALUES(?, ?, ?, ?, ?)`,
            [ cui, tipoCuenta, 'Q', monto, '1000' ]
        )
        return res.status(200).json({ status: 200, message: "cuenta creada" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

const obtenerClienteCui = async (_, res) => {
    try {
        const [ rows ] = await db.query(`SELECT CUI, CONCAT(NOMBRE, ' ', APELLIDO) NOMBRE FROM CLIENTE;`)
        return res.status(200).json({ status: 200, message: "clientes encontrados", clientes: rows });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

const actualizarCliente = async (req, res) => {
    try {
        const { formData, actuales } = req.body
        var query = ''
        var values = []

        if(formData.telefono != actuales.telefono) {
            query = 'TELEFONO = ?'
            values.push(formData.telefono)
        }
        if(formData.direccion != actuales.direccion) {
            query += (query != '' ? ', ': '') + 'DIRECCION = ?'
            values.push(formData.direccion)
        }
        if(formData.email != actuales.email) {
            query += (query != '' ? ', ': '') + 'EMAIL = ?'
            values.push(formData.email)
        }
        if(formData.preguntaSeguridad != actuales.preguntaSeguridad) {
            query += (query != '' ? ', ': '') + 'PREGUNTA = ?'
            values.push(formData.preguntaSeguridad)
        }
        if(formData.respuestaSeguridad != actuales.respuestaSeguridad) {
            query += (query != '' ? ', ': '') + 'RESPUESTA = ?'
            values.push(formData.respuestaSeguridad)
        }

        if(values.length > 0) {
            values.push(formData.cui)
            await db.query(`UPDATE CLIENTE SET ${query} WHERE CUI = ?;`, values)
        }

        return res.status(200).json({ status: 200, message: "cliente actualizado" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

export const atencionCliente = { obtenerCliente, solicitarCrearCuenta, obtenerClienteCui, actualizarCliente };
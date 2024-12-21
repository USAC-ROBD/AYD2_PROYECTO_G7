import db from "../utils/db_connection.mjs";

const obtenerCliente = async (req, res) => {
    try {
        const { cui } = req.query
        const [ rows ] = await db.query(`SELECT * FROM CLIENTE WHERE CUI = ?`, [ cui ])
        console.log(rows)
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
        console.log(error)
        return res.status(500).json({ status: 500, message: "consulta erronea" });
    }
}

export const atencionCliente = { obtenerCliente, solicitarCrearCuenta };
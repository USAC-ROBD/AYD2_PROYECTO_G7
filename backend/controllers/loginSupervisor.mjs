
import db from '../utils/db_connection.mjs';
import bcrypt from 'bcrypt';

export const loginSupervisor = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!password) {
            return res.status(400).json({ status: 400, message: "No fue posible leer el acrchivo" });
        }

        //quitamos los saltos de linea
        const password2 = password.replace(/(\r\n|\n|\r)/gm, "");

        // Consultar el usuario en la base de datos por nombre de usuario o correo
        const [rows] = await db.query(
            "SELECT ID_USUARIO FROM USUARIO WHERE USUARIO = ? OR CORREO = ?",
            [username, username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ status: 401, message: "Error al identificar al usuario" });
        }

        const user = rows[0];

        //obtenemos la claver encriptada del usuario con el id

        const [rows2] = await db.query( 
            "SELECT CLAVE FROM CLAVE_SUPERVISOR WHERE ID_USUARIO = ?",
            [user.ID_USUARIO]
        );

        if (rows2.length === 0) {
            return res.status(401).json({ status: 401, message: "Error al identificar al usuario" });
        }

        const clave = rows2[0];

        // Validar la contraseña usando bcrypt
        const validPassword = await bcrypt.compare(password2, clave.CLAVE);
        if (!validPassword) {
            return res.status(401).json({ status: 401, message: "Clave AYD no valida" });
        }

        return res.json({ status: 200, message: "Login exitoso" });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
};

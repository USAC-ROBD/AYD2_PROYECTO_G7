// auth.mjs
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 400, message: "Faltan Datos" });
  }

  try {
    // Consultar el usuario en la base de datos por nombre de usuario o correo
    const [rows] = await db.query(
      "SELECT ID_USUARIO, USUARIO, CORREO, CONTRASENA, ID_ROL, ESTADO FROM USUARIO WHERE USUARIO = ? OR CORREO = ?",
      [username, username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ status: 401, message: "Usuario o contraseña incorrectos" });
    }

    const user = rows[0];

    // Validar la contraseña usando bcrypt
    const validPassword = await bcrypt.compare(password, user.CONTRASENA);
    if (!validPassword) {
      return res.status(401).json({ status: 401, message: "Usuario o contraseña incorrectos" });
    }

    // Validar si la cuenta está activa
    if (user.ESTADO !== 'A') {
      return res.status(401).json({ status: 401, message: "Cuenta inactiva" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.ID_USUARIO, username: user.USUARIO, role: user.ID_ROL }, // roles: 1: Admin, 2: Cajero, 3: Supervisor
      configurations.secret_key_jwt,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
      maxAge: 3600000,
    });

    return res.json({ status: 200, message: "Login exitoso", rol: user.ID_ROL });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Error en el servidor" });
  }
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ status: 403, message: 'Acceso denegado. Vuelva a Iniciar Sesión' });
  }

  try {
    const decoded = jwt.verify(token, configurations.secret_key_jwt); // Decodificar el token

    // Validar si el token ha expirado
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ status: 401, message: 'La Sesión ha expirado.' });
    }

    req.user = decoded; // Adjuntar la información del usuario decodificado al objeto req
    next(); // Continuar con la siguiente función de middleware
  } catch (err) {
    return res.status(401).json({ status: 401, message: 'Sesión inválido.' });
  }
};

const confirmation = async (req, res) => {
  const { id } = req.query
  const [rows, fields] = await db.query(`SELECT USUARIO FROM USUARIO WHERE ID_USUARIO = ? AND ESTADO = ?`, [id, 'P'])

  if (rows.length > 0) {
    await db.query(`UPDATE USUARIO SET ESTADO = ? WHERE ID_USUARIO = ?`, ['A', id])
    return res.status(200).json({ status: 200, message: 'Cuenta confirmada' })
  }
  return res.status(400).json({ status: 400, message: 'Cuenta no encontrada o ya confirmada' })
}


export const auth = {
  login,
  verifyToken,
  confirmation,
};


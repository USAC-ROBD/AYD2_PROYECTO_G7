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
      "SELECT ID_USUARIO, USUARIO, CORREO, CONTRASENA, ID_ROL FROM USUARIO WHERE USUARIO = ? OR CORREO = ?",
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

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.ID_USUARIO, username: user.USUARIO, role: user.ID_ROL },
      configurations.secret_key_jwt,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000, // 1 hora
      sameSite: 'strict',
    });

    return res.json({ status: 200, message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Error en el servidor" });
  }
};

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, configurations.secret_key_jwt, (err, decoded) => {
    if (err) return res.status(400).send('Invalid token');
    req.user = decoded;
    next();
  });
};

export const auth = {
  login,
  verifyToken,
};

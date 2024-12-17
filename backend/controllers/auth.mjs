// Propósito: Controlador con metodos para el pago de servicios
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";
import jwt from 'jsonwebtoken';

let users = [ {username: 'admin', password: 'admin', rol: "cajero"} ];


const login = async (req, res) => {

    const { username, password } = req.body; // puede ser el correo o el nombre de usuario

    if (!username || !password) {
        return res.status(400).json({ "status": 400, "message": "Faltan Datos" });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ "status": 401, "message": "Usuario o contraseña incorrectos" });
    }
    
    const token = jwt.sign({ username, rol: user.rol }, configurations.secret_key_jwt, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: false,
        secure: false,   // Asegúrate de tener HTTPS en producción
        maxAge: 3600000, // 1 hora
        sameSite: 'strict', // Permitir el acceso desde diferentes dominios
      });
    
    return res.json({ "status": 200, "message": "Login exitoso"});
}

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied');
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(400).send('Invalid token');
      req.user = decoded;
      next();
    });
  };


export const auth = {
    login,
    verifyToken
};
// Propósito: Controlador de ejemplo para mostrar el funcionamiento de la API
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const registrar_usuario = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const {nombre, apellido, edad, telefono, dpi, correo, papeleria, fotografia, genero, estado_civil} = req.body;
    
        // Ejecuta la consulta para actualizar el rol del usuario
        const [rows] = await db.query(
          `INSERT INTO usuario () VALUES()`,
          [rol, id_usuario]
        );
    
        // Verifica si algún registro fue afectado
        if (rows.affectedRows > 0) {
          return res.status(200).json({
            success: true,
            message: "Rol del usuario actualizado correctamente.",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Usuario no encontrado.",
          });
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al actualizar el rol del usuario:", error);
        return res.status(500).json({
          success: false,
          message: "Error interno del servidor.",
        });
      }
}

function Generar_Usuario(nombre,apellido,edad){
    usuario = nombre[0]+apellido+edad
    return usuario
}

function Generar_Contraseña(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contraseña = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        contraseña += caracteres[randomIndex];
    }
    return contraseña
}

const obtener_usuario_rol = async (req, res) => {
    try {
        const [rows, fields] = await db.query(` 
            SELECT 
            u.ID_USUARIO,
            u.USUARIO,
            r.NOMBRE AS ROL
            FROM usuario u
            INNER JOIN rol r ON u.ID_ROL = r.ID_ROL
        `);

        // Retorna los datos al frontend
        res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        console.error('Error al obtener usuarios con roles:', error);
        res.status(500).json({
          success: false,
          message: 'Error al obtener usuarios con roles',
        });
      }
}

const obtener_usuario = async (req, res) => {
    try {
        const [rows, fields] = await db.query(` 
            SELECT 
            u.ID_USUARIO,
            u.NOMBRE,
            U.APELLIDO,
            u.USUARIO,
            r.NOMBRE AS ROL
            FROM usuario u
            INNER JOIN rol r ON u.ID_ROL = r.ID_ROL
        `);

        // Retorna los datos al frontend
        res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({
          success: false,
          message: 'Error al obtener usuarios',
        });
      }
}

const actualizar_usuario_rol = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { id_usuario, rol } = req.body;
    
        // Verifica que los datos necesarios estén presentes
        if (!id_usuario || !rol) {
          return res.status(400).json({
            success: false,
            message: "Se requiere el id_usuario y el rol para actualizar.",
          });
        }
    
        // Ejecuta la consulta para actualizar el rol del usuario
        const [rows] = await db.query(
          `UPDATE usuario 
           SET ID_ROL = ?
           WHERE ID_USUARIO = ?`,
          [rol, id_usuario]
        );
    
        // Verifica si algún registro fue afectado
        if (rows.affectedRows > 0) {
          return res.status(200).json({
            success: true,
            message: "Rol del usuario actualizado correctamente.",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Usuario no encontrado.",
          });
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al actualizar el rol del usuario:", error);
        return res.status(500).json({
          success: false,
          message: "Error interno del servidor.",
        });
      }
}

const eliminar_usuario = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { id_usuario } = req.body;
    
        // Verifica que los datos necesarios estén presentes
        if (!id_usuario) {
          return res.status(400).json({
            success: false,
            message: "Se requiere el id_usuario para eliminar el usuario",
          });
        }
    
        // Ejecuta la consulta para actualizar el rol del usuario
        const [rows] = await db.query(
          `DELETE FROM usuario 
           WHERE ID_USUARIO = ?`,
          [id_usuario]
        );
    
        // Verifica si algún registro fue afectado
        if (rows.affectedRows > 0) {
          return res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente.",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Usuario no encontrado.",
          });
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({
          success: false,
          message: "Error interno del servidor.",
        });
      }
}

const cambiar_contrasena = async (req, res) => {
    const {id_usuario} = req.body;
    
    const [rowsUser] = await 
    db.query(`SELECT 
        CORREO FROM USUARIO
        WHERE 
        ID_USUARIO = ?`, [id_usuario]);
    
    // Validación de que la cuenta destino existe
    if (rowsUser.length === 0) {
        return res.status(404).json({
            "status": 404,
            "message": "Cuenta origen no encontrada",
        });
    }

    const email = rowsUser[0].CORREO;
    const contraseña = Generar_Contraseña();

    const hashed_password = bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10))
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'juanpablogonzalez017@gmail.com',
          pass: 'xzvu svpw dswo otfw'
        }
      });
    
    const [rows] = await db.query(
        `UPDATE usuario 
         SET CONTRASENA = ?
         WHERE ID_USUARIO = ?`,
        [hashed_password, id_usuario]
      );

      const mailOptions = {
        from: 'juanpablogonzalez017@gmail.com',
        to: email, 
        subject: 'Nueva contraseña', 
        text: `Se ha generado una nueva contraseña para su usuario porfabor no la comparta con nadie mas: ${contraseña}`, 
      };
      
      // Enviar el correo
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ "status": 500, "message": "Error con el correo electronico del cliente"});
        } else {
            return res.status(200).json({ "status": 200, "message": "Contrasena enviada al correo del usuario"});
        }
      });
}

export const administrador = {
    obtener_usuario_rol,
    obtener_usuario,
    actualizar_usuario_rol,
    eliminar_usuario,
    cambiar_contrasena
  };

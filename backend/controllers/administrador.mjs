// Propósito: Controlador de ejemplo para mostrar el funcionamiento de la API
import db from "../utils/db_connection.mjs";
import bcrypt from 'bcrypt';
import { transporter, credentialsUser, updatePassword} from "../utils/nodemailer.mjs";
import { spawn } from 'child_process';

// Factoría para crear usuarios
class UsuarioFactory {
    static crearUsuario(data) {
        const usuario = this.generarUsuario(data.nombre, data.apellido, data.edad);
        const contrasena = this.generarContrasena();
        const hashedPassword = bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10));

        return {
            usuario,
            contrasena,
            hashedPassword,
            ...data
        };
    }

    static generarUsuario(nombre, apellido, edad) {
        return nombre.replace(/\s+/g, '')[0].toUpperCase() + apellido.replace(/\s+/g, '').toUpperCase() + String(edad);
    }

    static generarContrasena() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let contrasena = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            contrasena += caracteres[randomIndex];
        }
        return contrasena;
    }
}

// Controlador principal
const registrar_usuario = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { nombre, apellido, edad, telefono, dpi, rol, correo, papeleria, fotografia, genero, estado_civil } = req.body;

        // Usa la factoría para crear el usuario y la contraseña
        const nuevoUsuario = UsuarioFactory.crearUsuario({
            nombre,
            apellido,
            edad,
            telefono,
            dpi,
            rol,
            correo,
            papeleria,
            fotografia,
            genero,
            estado_civil
        });

        // Ejecuta la consulta para registrar el usuario
        const [rows] = await db.query(
            `INSERT INTO USUARIO (USUARIO, CONTRASENA, NOMBRE, APELLIDO, CORREO, ESTADO, ID_ROL, CREA, ACTUALIZA, TELEFONO, EDAD, PAPELERIA, FOTO, GENERO, CUI, ESTADO_CIVIL) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nuevoUsuario.usuario,
                nuevoUsuario.hashedPassword,
                nuevoUsuario.nombre,
                nuevoUsuario.apellido,
                nuevoUsuario.correo,
                'A',
                nuevoUsuario.rol,
                'admin',
                'admin',
                nuevoUsuario.telefono,
                nuevoUsuario.edad,
                nuevoUsuario.papeleria,
                nuevoUsuario.fotografia,
                nuevoUsuario.genero,
                nuevoUsuario.dpi,
                nuevoUsuario.estado_civil
            ]
        );

        // Verifica si algún registro fue afectado
        if (rows.affectedRows > 0) {
            const mail = credentialsUser(nuevoUsuario.usuario, nuevoUsuario.correo, nuevoUsuario.contrasena);

            transporter.sendMail(mail, (error, info) => {
                if (error) {
                    console.error("Error al enviar el correo de actualización:", error.message);
                } else {
                    return res.status(200).json({ status: 200, message: "Datos para inicio de sesión Usuario" });
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Error al intentar crear el usuario."
            });
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        });
    }
};

const obtener_usuario_rol = async (req, res) => {
    try {
        const [rows, fields] = await db.query(` 
            SELECT 
            u.ID_USUARIO,
            u.USUARIO,
            r.NOMBRE AS ROL
            FROM USUARIO u
            INNER JOIN ROL r ON u.ID_ROL = r.ID_ROL
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
            u.APELLIDO,
            u.USUARIO,
            r.NOMBRE AS ROL
            FROM USUARIO u
            INNER JOIN ROL r ON u.ID_ROL = r.ID_ROL
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
            `UPDATE USUARIO 
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
            `DELETE FROM USUARIO 
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
    const { id_usuario } = req.body;

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

    const [rows] = await db.query(
        `UPDATE usuario 
         SET CONTRASENA = ?
         WHERE ID_USUARIO = ?`,
        [hashed_password, id_usuario]
    );

    const mail = updatePassword(email,contraseña);

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            console.error("Error al enviar el correo de actualización:", error.message);
            }else{
                return res.status(200).json({ "status": 200, "message": "Contraseña actualizada" });
            }
    });
}

const backup = async (req, res) => {
    try {
        // Consulta todas las tablas de la base de datos
        const [tables] = await db.query("SHOW TABLES");

        // Variable para almacenar el contenido del respaldo
        let backupData = "";

        for (const tableObj of tables) {
            const tableName = Object.values(tableObj)[0];

            // Agregar estructura de la tabla
            const [tableStructure] = await db.query(`SHOW CREATE TABLE \`${tableName}\``);
            backupData += `\n\n-- Estructura de la tabla ${tableName}\n`;
            backupData += `${tableStructure[0]["Create Table"]};\n`;

            // Agregar datos de la tabla
            const [rows] = await db.query(`SELECT * FROM \`${tableName}\``);
            if (rows.length > 0) {
                backupData += `\n-- Datos de la tabla ${tableName}\n`;
                rows.forEach(row => {
                    const values = Object.values(row)
                        .map(value => (typeof value === "string" ? `'${value.replace(/'/g, "\\'")}'` : value))
                        .join(", ");
                    backupData += `INSERT INTO \`${tableName}\` VALUES (${values});\n`;
                });
            }
        }

        // Configurar la respuesta como archivo para descargar
        res.setHeader("Content-Disposition", "attachment; filename=backup.sql");
        res.setHeader("Content-Type", "application/sql");
        res.send(backupData);

    } catch (error) {
        console.error("Error al generar el respaldo:", error);
        res.status(500).send("Error al generar el respaldo");
    }
};

export const administrador = {
    obtener_usuario_rol,
    obtener_usuario,
    actualizar_usuario_rol,
    eliminar_usuario,
    cambiar_contrasena,
    registrar_usuario,
    backup
};

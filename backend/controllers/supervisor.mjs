// Propósito: Controlador con metodos para el módulo de supervisor
import db from "../utils/db_connection.mjs";
import { auth } from "./auth.mjs";
import { transporter, confirmationAccountMail, updateAccountMail } from "../utils/nodemailer.mjs";
import { UsuarioFactory } from "../models/UsuarioFactory.mjs";
import upload from "../utils/multer.mjs";

const obtenerQuejas = [auth.verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                Q.ID_QUEJA AS id,
                Q.CUI AS cui,
                CONCAT(C.NOMBRE, ' ', C.APELLIDO) AS cliente,
                CASE
                    WHEN Q.CATEGORIA = 'A' THEN 'Atención'
                    WHEN Q.CATEGORIA = 'P' THEN 'Producto'
                    WHEN Q.CATEGORIA = 'S' THEN 'Servicio'
                    ELSE 'Otro'
                END AS categoria,
                Q.DESCRIPCION AS descripcion,
                Q.CREACION AS creado,
                Q.CREA AS crea
            FROM QUEJA Q
                INNER JOIN CLIENTE C ON Q.CUI = C.CUI
            ORDER BY Q.CREACION DESC`
        );

        const response = {
            "status": 200,
            "message": "Quejas obtenidas correctamente",
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerQuejas:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const registrarAdministrador = [auth.verifyToken, upload.fields([{ name: "papeleria"}, { name: "foto"}]), async (req, res) => {
    try {
        const { nombre, apellido, telefono, correo, edad, cui, genero, estado_civil } = req.body;

        const papeleria = req.files.papeleria[0] ? req.files.papeleria[0].buffer : null;
        const foto = req.files.foto[0] ? req.files.foto[0].buffer : null;

        if (!nombre || !apellido || !telefono || !correo || !edad || !cui || !genero || !estado_civil || !papeleria || !foto) {
            return res.status(400).json({ "status": 400, "message": "Faltan campos obligatorios" });
        }

        const admin = UsuarioFactory.crearUsuario("admin", null, null, cui, nombre, apellido, telefono, correo, { edad, genero, estado_civil, papeleria, foto });
        const id_usuario = await admin.registrar();

        if (!id_usuario) {
            return res.status(500).json({ "status": 500, "message": "Error al registrar el administrador" });
        }

        const link = `${process.env.FRONT_URL}/confirmar-cuenta/${id_usuario}`;

        const mail = confirmationAccountMail(admin, link);

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo de confirmación:", error.message);
                return res.status(500).json({ "status": 500, "message": "Error al enviar el correo de confirmación" });
            }
        });

        const response = {
            "status": 200,
            "message": "Administrador registrado correctamente, se ha enviado un correo de confirmación",
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en registrarAdministrador:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const actualizarAdministrador = [auth.verifyToken, upload.fields([{ name: "papeleria"}, { name: "foto"}]), async (req, res) => {
    try {
        const { id_usuario, usuario, nombre, apellido, telefono, correo, edad, cui, genero, estado_civil } = req.body;

        const papeleria = req.files?.papeleria?.[0]?.buffer || null;
        const foto = req.files?.foto?.[0]?.buffer || null;

        if (!id_usuario || !usuario || !nombre || !apellido || !telefono || !correo || !edad || !cui || !genero || !estado_civil) {
            return res.status(400).json({ "status": 400, "message": "Faltan campos obligatorios" });
        }

        const admin = UsuarioFactory.crearUsuario("admin", id_usuario, usuario, cui, nombre, apellido, telefono, correo, { edad, genero, estado_civil, papeleria, foto });
        console.log(admin);
        const result = await admin.actualizar();

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ "status": 404, "message": "No se encontró el administrador" });
        }

        const mail = updateAccountMail(admin);

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo de actualización:", error.message);
            }
        });

        const response = {
            "status": 200,
            "message": "Administrador actualizado correctamente",
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en actualizarAdministrador:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const eliminarAdministrador = [auth.verifyToken, upload.none(), async (req, res) => {
    try {
        const { id_usuario, usuario } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ "status": 400, "message": "Falta el campo id" });
        }

        const admin = UsuarioFactory.crearUsuario("admin", id_usuario, usuario, null, null, null, null, null, { edad: null, genero: null, estado_civil: null, papeleria: null, foto: null });
        const result = await admin.eliminar();

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ "status": 404, "message": "No se encontró el administrador" });
        }

        const response = {
            "status": 200,
            "message": "Administrador eliminado correctamente",
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en eliminarAdministrador:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const obtenerAdministradores = [auth.verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                U.ID_USUARIO AS id,
                U.USUARIO AS usuario,
                U.NOMBRE AS nombre,
                U.APELLIDO AS apellido,
                U.TELEFONO AS telefono,
                U.CORREO AS correo,
                U.CUI AS cui,
                U.EDAD AS edad,
                U.GENERO genero,
                U.ESTADO_CIVIL estado_civil,
                U.PAPELERIA AS papeleria,
                U.FOTO AS foto,
                U.ESTADO AS estado,
                U.CREACION AS creado,
                U.CREA AS crea
            FROM USUARIO U
            WHERE U.ID_ROL = 1`
        );

        const response = {
            "status": 200,
            "message": "Administradores obtenidos correctamente",
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerAdministradores:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

export const supervisor = {
    obtenerQuejas,
    registrarAdministrador,
    actualizarAdministrador,
    eliminarAdministrador,
    obtenerAdministradores,
};
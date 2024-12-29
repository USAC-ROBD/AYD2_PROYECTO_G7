// Propósito: Controlador con metodos para el módulo de supervisor
import db from "../utils/db_connection.mjs";
import { auth } from "./auth.mjs";
import { transporter, confirmationAccountMail, updateAccountMail } from "../utils/nodemailer.mjs";
import { UsuarioFactory } from "../models/UsuarioFactory.mjs";
import upload from "../utils/multer.mjs";
import { AceptarCommand } from "../commands/AceptarCommand.mjs";
import { RechazarCommand } from "../commands/RechazarCommand.mjs";

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

const registrarAdministrador = [auth.verifyToken, upload.fields([{ name: "papeleria" }, { name: "foto" }]), async (req, res) => {
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

const actualizarAdministrador = [auth.verifyToken, upload.fields([{ name: "papeleria" }, { name: "foto" }]), async (req, res) => {
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

const obtenerActividades = [auth.verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                CREACION as fecha,
                CREA as empleado,
                DESCRIPCION as actividad,
                TIPO as tipo
            FROM VISTA_ACTIVIDADES`
        );

        const response = {
            "status": 200,
            "message": "Actividades obtenidas correctamente",
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerActividades:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const obtenerMovimientos = [auth.verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                CREACION AS fecha,
                CREA AS empleado,
                DESCRIPCION AS movimiento,
                MONTO AS monto,
                TIPO AS tipo
            FROM VISTA_MOVIMIENTOS`
        );

        const response = {
            "status": 200,
            "message": "Movimientos obtenidos correctamente",
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerMovimientos:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const obtenerDisponibilidad = [auth.verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                MONEDA AS moneda,
                MONTO AS monto
            FROM VISTA_DISPONIBILIDAD`
        );

        const response = {
            "status": 200,
            "message": "Disponibilidad obtenida correctamente",
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerDisponibilidad:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const obtenerDisponibilidadDia = [auth.verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                DIA AS dia,
                QUETZALES AS quetzales,
                DOLARES AS dolares
            FROM VISTA_DISPONIBILIDAD_DIA`
        );

        const response = {
            "status": 200,
            "message": "Disponibilidad obtenida correctamente",
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerDisponibilidadDia:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
}];

const obtenerEncuestas = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                c.NOMBRE,
                c.APELLIDO,
                c.CUI,
                e.CATEGORIA,
                e.CALIFICACION,
                e.COMENTARIO          
            FROM 
                ENCUESTA as e
            INNER JOIN
                CLIENTE as c
            ON
            c.CUI = e.CUI`
        );

        const response = {
            "status": 200,
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerEncuestas:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
};


const obtenerSolicitudesCancelacion = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                S.ID_SOLICITUD as id,
                S.CUI as cui,
                CONCAT(C.NOMBRE, ' ', C.APELLIDO) as cliente,
                CASE
                    WHEN S.TIPO_SERVICIO = 'T' THEN 'Tarjeta'
                    WHEN S.TIPO_SERVICIO = 'C' THEN 'Cuenta'
                    ELSE 'Otro'
                END AS servicio,
                CASE
                    WHEN S.TIPO_SERVICIO = 'T' THEN
                        (SELECT T.NUMERO FROM TARJETA T WHERE T.ID_TARJETA = S.ID_TARJETA)
                    WHEN S.TIPO_SERVICIO = 'C' THEN
                        (SELECT C.NUMERO FROM CUENTA C WHERE C.ID_CUENTA = S.ID_CUENTA)
                    ELSE 'Otro'
                END AS numero,
                CASE
                    WHEN S.TIPO_SERVICIO = 'T' THEN
                        (SELECT IFNULL(T.SALDO, 0) FROM TARJETA T WHERE T.ID_TARJETA = S.ID_TARJETA)
                    WHEN S.TIPO_SERVICIO = 'C' THEN
                        (SELECT IFNULL(C.SALDO, 0) FROM CUENTA C WHERE C.ID_CUENTA = S.ID_CUENTA)
                    ELSE 'Otro'
                END AS saldo,
                S.DESCRIPCION as motivo,
                S.CREACION as creado,
                S.CREA as crea
            FROM SOLICITUD S
                INNER JOIN CLIENTE C ON S.CUI = C.CUI
            WHERE S.ESTADO = 'P'
                AND TIPO = 'C'
            ORDER BY S.CREACION DESC`
        );

        const response = {
            "status": 200,
            "message": "Solicitudes de cancelación obtenidas correctamente",
            "data": rows,
        };
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerSolicitudesCancelacion:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
};

const obtenerPrestamos = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT
            ID_SOLICITUD, 
            CUI, 
            TIPO_PRESTAMO, 
            MONTO, 
            PLAZO
            FROM 
            solicitud s
            WHERE 
            TIPO = 'S'
            AND TIPO_SERVICIO = 'P'
            AND ESTADO = 'P'`
        );

        const response = {
            "status": 200,
            "data": rows,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en obtenerPrestamo:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
};

const aceptarCancelacion = async (req, res) => {
    const { id, tipo } = req.body;

    if (!id || !tipo) {
        return res.status(400).json({ "status": 400, "message": "Faltan campos obligatorios" });
    }

    try {
        const command = new AceptarCommand(id, tipo, db);
        const result = await command.execute();
        return res.status(result.status).json({ "status": result.status, "message": result.message });
    } catch (error) {
        console.error("Error en aceptarCancelacion:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
};

const rechazarCancelacion = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ "status": 400, "message": "Faltan campos obligatorios" });
    }

    try {
        const command = new RechazarCommand(id, db);
        const result = await command.execute();
        return res.status(result.status).json({ "status": result.status, "message": result.message });
    } catch (error) {
        console.error("Error en rechazarCancelacion:", error.message);
        return res.status(500).json({ "status": 500, "message": error.message });
    }
};

const actualizar_prestamo = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { id_solicitud, estado} = req.body;

        // Verifica que los datos necesarios estén presentes
        if (!id_solicitud || !estado) {
            return res.status(400).json({
                success: false,
                message: "Se requiere el id_usuario y el rol para actualizar.",
            });
        }

        // Ejecuta la consulta para actualizar el rol del usuario
        const [rows] = await db.query(
            `UPDATE SOLICITUD 
           SET ESTADO = ?
           WHERE ID_SOLICITUD = ?`,
            [estado, id_solicitud]
        );

        // Verifica si algún registro fue afectado
        if (rows.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "Aprobacion de prestamo con exito.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Solicitud de prestamo no encontrado.",
            });
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al actualizar el estado de la solicitud prestamo", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor.",
        });
    }
}


export const supervisor = {
    actualizar_prestamo,
    obtenerPrestamos,
    obtenerEncuestas,
    obtenerQuejas,
    registrarAdministrador,
    actualizarAdministrador,
    eliminarAdministrador,
    obtenerAdministradores,
    obtenerActividades,
    obtenerMovimientos,
    obtenerDisponibilidad,
    obtenerDisponibilidadDia,
    obtenerSolicitudesCancelacion,
    aceptarCancelacion,
    rechazarCancelacion,
};
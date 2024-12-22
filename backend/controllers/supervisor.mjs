// Propósito: Controlador con metodos para el módulo de supervisor
import db from "../utils/db_connection.mjs";
import { auth } from "./auth.mjs";

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


export const supervisor = {
    obtenerQuejas,
};
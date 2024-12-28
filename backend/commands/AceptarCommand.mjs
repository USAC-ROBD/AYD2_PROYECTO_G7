import { Command } from './Command.mjs';

class AceptarCommand extends Command {
    constructor(id, tipo, db) {
        super();
        this.id = id;
        this.tipo = tipo;
        this.db = db;
    }

    async execute() {
        try {
            if (this.tipo === 'T') {
                const [tarjeta] = await this.db.query('SELECT T.ID_TARJETA, T.ESTADO, IFNULL(T.SALDO, 0) AS SALDO FROM TARJETA T INNER JOIN SOLICITUD S ON T.ID_TARJETA = S.ID_TARJETA WHERE S.ID_SOLICITUD = ?', [this.id]);
                if (tarjeta.length === 0) {
                    return { status: 404, message: 'Tarjeta no encontrada' };
                }
                if (tarjeta[0].ESTADO === 'I') {
                    return { status: 400, message: 'La tarjeta ya ha sido Cancelada' };
                }
                if (tarjeta[0].SALDO > 0) {
                    return { status: 400, message: 'La tarjeta tiene saldo pendiente' };
                }
                const update = 'UPDATE TARJETA SET ESTADO = ? WHERE ID_TARJETA = ?';
                const updateParams = ['I', tarjeta[0].ID_TARJETA];
                const [updates] = await this.db.query(update, updateParams);
                if (updates.affectedRows === 0) {
                    return { status: 500, message: 'Error al cancelar la tarjeta' };
                }
            } else if (this.tipo === 'C') {
                const [cuenta] = await this.db.query('SELECT C.ID_CUENTA, C.ESTADO, IFNULL(C.SALDO, 0) AS SALDO FROM CUENTA C INNER JOIN SOLICITUD S ON C.ID_CUENTA = S.ID_CUENTA WHERE S.ID_SOLICITUD = ?', [this.id]);
                if (cuenta.length === 0) {
                    return { status: 404, message: 'Cuenta no encontrada' };
                }
                if (cuenta[0].ESTADO === 'I') {
                    return { status: 400, message: 'La cuenta ya ha sido Cancelada' };
                }
                if (cuenta[0].SALDO > 0) {
                    return { status: 400, message: 'La cuenta tiene saldo pendiente' };
                }
                const update = 'UPDATE CUENTA SET ESTADO = ? WHERE ID_CUENTA = ?';
                const updateParams = ['I', cuenta[0].ID_CUENTA];
                const [updates] = await this.db.query(update, updateParams);
                if (updates.affectedRows === 0) {
                    return { status: 500, message: 'Error al cancelar la cuenta' };
                }
            } else {
                return { status: 400, message: 'Tipo de solicitud no válido' };
            }

            const query = 'UPDATE SOLICITUD SET ESTADO = ? WHERE ID_SOLICITUD = ?';
            const params = ['A', this.id];
            await this.db.query(query, params);
            return { status: 200, message: 'Solicitud aceptada exitosamente' };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }
}

export { AceptarCommand };
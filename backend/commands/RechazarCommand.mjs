import { Command } from './Command.mjs';

class RechazarCommand extends Command {
    constructor(id, db) {
        super();
        this.id = id;
        this.db = db;
    }

    async execute() {
        const query = 'UPDATE SOLICITUD SET ESTADO = ? WHERE ID_SOLICITUD = ?';
        const params = ['R', this.id];
        await this.db.query(query, params);
        return { status: 200, message: 'Solicitud rechazada exitosamente' };
    }
}

export { RechazarCommand };
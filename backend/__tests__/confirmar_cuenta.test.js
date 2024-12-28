import request from 'supertest';
import app from '../index.test.mjs';
import db from '../utils/db_connection.mjs';

jest.mock('../utils/db_connection.mjs', () => ({
    query: jest.fn(),
}));

describe('Pruebas unitarias para /confirmar_cuenta', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /confirmar_cuenta - Cuenta confirmada correctamente', async () => {
        db.query.mockResolvedValueOnce([[{
            USUARIO: 'admin'
        }]]);

        const res = await request(app).get('/confirmar_cuenta').query({ id: 1 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 200);
        expect(res.body).toHaveProperty('message', 'Cuenta confirmada');
        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE USUARIO SET ESTADO = ? WHERE ID_USUARIO = ?'),
            ['A', '1']
        );
    });

    test('GET /confirmar_cuenta - Cuenta no encontrada o ya confirmada', async () => {
        db.query.mockResolvedValueOnce([[]]);

        const res = await request(app).get('/confirmar_cuenta').query({ id: 1 });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 400);
        expect(res.body).toHaveProperty('message', 'Cuenta no encontrada o ya confirmada');
    });
});
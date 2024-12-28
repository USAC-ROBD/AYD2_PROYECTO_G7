import request from 'supertest';
import app from '../index.test.mjs';
import db from '../utils/db_connection.mjs';
import { auth } from '../controllers/auth.mjs';

jest.mock('../utils/db_connection.mjs', () => ({
    query: jest.fn(),
}));

jest.mock('../controllers/auth.mjs', () => ({
    auth: {
        login: jest.fn(),
        verifyToken: jest.fn((req, res, next) => next()),
        confirmation: jest.fn(),
    }
}));

describe('pruebas unitarias para /mostrarsaldo', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /mostrarsaldo - Saldo encontrado correctamente', async () => {

        db.query.mockResolvedValueOnce([[{
            numero: '123456',
            titular: 'Juan Perez',
            saldo: 1000,
            actualizacion: '2024-12-28'
        }]]);

        const res = await request(app).get('/mostrarsaldo').query({ numcuenta: '123456' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 200);
        expect(res.body).toHaveProperty('message', 'cuenta encontrada');
        expect(res.body).toHaveProperty('cuenta');
        expect(res.body.cuenta).toHaveProperty('numero', '123456');
        expect(res.body.cuenta).toHaveProperty('titular', 'Juan Perez');
        expect(res.body.cuenta).toHaveProperty('saldo', 1000);
        expect(res.body.cuenta).toHaveProperty('actualizacion', '2024-12-28');
    });

    test('GET /mostrarsaldo - Error en la consulta', async () => {

        db.query.mockRejectedValueOnce(new Error('Error en la consulta'));

        const res = await request(app).get('/mostrarsaldo').query({ numcuenta: '123456' });

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('status', 500);
        expect(res.body).toHaveProperty('message', 'consulta erronea');
    });
});
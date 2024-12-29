import request from 'supertest';
import app from '../index.test.mjs';
import db from '../utils/db_connection.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../utils/db_connection.mjs', () => ({
    query: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('Pruebas unitarias para /login', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('POST /login - Login exitoso', async () => {
        db.query.mockResolvedValueOnce([[{
            ID_USUARIO: 1,
            USUARIO: 'admin',
            CORREO: 'admin@example.com',
            CONTRASENA: 'hashed_password',
            ID_ROL: 1,
            ESTADO: 'A',
        }]]);

        bcrypt.compare.mockResolvedValueOnce(true);

        jwt.sign.mockReturnValueOnce('mocked_token');

        const res = await request(app).post('/login').send({
            username: 'admin',
            password: 'admin'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 200);
        expect(res.body).toHaveProperty('message', 'Login exitoso');
        expect(res.body).toHaveProperty('rol', 1);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: 1, username: 'admin', role: 1 },
            expect.any(String),
            { expiresIn: '1h' }
        );
    });

    test('POST /login - Usuario no encontrado', async () => {
        db.query.mockResolvedValueOnce([[]]);

        const res = await request(app).post('/login').send({
            username: 'admin',
            password: 'admin'
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('status', 401);
        expect(res.body).toHaveProperty('message', 'Usuario o contraseña incorrectos');
    });

    test('POST /login - Contraseña incorrecta', async () => {
        db.query.mockResolvedValueOnce([[{
            ID_USUARIO: 1,
            USUARIO: 'admin',
            CORREO: 'admin@example.com',
            CONTRASENA: 'hashed_password',
            ID_ROL: 1,
            ESTADO: 'A',
        }]]);
        
        bcrypt.compare.mockResolvedValueOnce(false);

        const res = await request(app).post('/login').send({
            username: 'admin',
            password: 'admin'
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('status', 401);
        expect(res.body).toHaveProperty('message', 'Usuario o contraseña incorrectos');
    });

    test('POST /login - Cuenta inactiva', async () => {
        db.query.mockResolvedValueOnce([[{
            ID_USUARIO: 1,
            USUARIO: 'admin',
            CORREO: 'admin@example.com',
            CONTRASENA: 'hashed_password',
            ID_ROL: 1,
            ESTADO: 'I',
        }]]);

        bcrypt.compare.mockResolvedValueOnce(true);

        const res = await request(app).post('/login').send({
            username: 'admin',
            password: 'admin'
        });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('status', 401);
        expect(res.body).toHaveProperty('message', 'Cuenta inactiva');
    });
});
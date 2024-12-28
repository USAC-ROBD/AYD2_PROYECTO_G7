import request from 'supertest';
import app from '../index.test.mjs';
import { auth } from '../controllers/auth.mjs';
import { UsuarioFactory } from '../models/UsuarioFactory.mjs';

jest.mock('../controllers/auth.mjs', () => ({
    auth: {
        login: jest.fn(),
        verifyToken: jest.fn((req, res, next) => next()),
        confirmation: jest.fn(),
    }
}));

jest.mock('../models/UsuarioFactory.mjs', () => ({
    UsuarioFactory: {
        crearUsuario: jest.fn(() => ({
            eliminar: jest.fn(),
        })),
    }
}));

describe('pruebas unitarias para /eliminar_administrador', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('POST /eliminar_administrador - Administrador eliminado correctamente', async () => {

        UsuarioFactory.crearUsuario.mockReturnValueOnce({
            eliminar: jest.fn().mockResolvedValueOnce({ affectedRows: 1 }),
        });

        const res = await request(app).post('/eliminar_administrador').send({ id_usuario: 1, usuario: 'admin' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 200);
        expect(res.body).toHaveProperty('message', 'Administrador eliminado correctamente');
    });

    test('POST /eliminar_administrador - Faltan datos', async () => {
        const res = await request(app).post('/eliminar_administrador').send({ usuario: 'admin' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 400);
        expect(res.body).toHaveProperty('message', 'Falta el campo id');
    });

    test('POST /eliminar_administrador - Administrador no encontrado', async () => {
        UsuarioFactory.crearUsuario.mockReturnValueOnce({
            eliminar: jest.fn().mockResolvedValueOnce({ affectedRows: 0 }),
        });

        const res = await request(app).post('/eliminar_administrador').send({ id_usuario: 1, usuario: 'admin' });
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('status', 404);
        expect(res.body).toHaveProperty('message', 'No se encontró el administrador');
    });

    test('POST /eliminar_administrador - Error al eliminar el administrador', async () => {
        UsuarioFactory.crearUsuario.mockReturnValueOnce({
            eliminar: jest.fn().mockRejectedValueOnce(new Error('Error en la base de datos')),
        });

        const res = await request(app).post('/eliminar_administrador').send({ id_usuario: 1, usuario: 'admin' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('status', 500);
        expect(res.body).toHaveProperty('message', 'Error en la base de datos');
    });
});
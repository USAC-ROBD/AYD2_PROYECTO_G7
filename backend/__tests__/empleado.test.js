import request from 'supertest';
import app from '../index.test.mjs';
import db from '../utils/db_connection.mjs';

jest.mock('../utils/db_connection.mjs', () => ({
    query: jest.fn(),
}));

describe('pruebas unitarias para /empleado', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /empleado - Respuesta exitosa', async () => {
        const mockUsuarios = [
            { ID_USUARIO: 1, NOMBRE: 'Juan', APELLIDO: 'Perez', USUARIO: 'jperez', ROL: 'Administrador' },
            { ID_USUARIO: 2, NOMBRE: 'Maria', APELLIDO: 'Gomez', USUARIO: 'mgomez', ROL: 'Supervisor' },
        ];

        db.query.mockResolvedValue([mockUsuarios, []]);

        const res = await request(app).get('/empleado');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data[0]).toHaveProperty('ID_USUARIO', 1);
        expect(res.body.data[0]).toHaveProperty('NOMBRE', 'Juan');
        expect(res.body.data[0]).toHaveProperty('ROL', 'Administrador');
    });

    test('GET /empleado - Error en la consulta', async () => {
        db.query.mockRejectedValue(new Error('Error en la consulta'));

        const res = await request(app).get('/empleado');

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Error al obtener usuarios');
    });
});
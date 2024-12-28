import request from 'supertest';
import app from '../index.test.mjs';

describe('Pruebas unitarias', () => {
    test('GET /login, debería devolver un status 200 y el ID del rol', async () => {
        const res = await request(app).get('/login').send({
            usuario: 'admin',
            contrasena: 'admin'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id_rol');
    }, 5000); // 5000 ms timeout
});
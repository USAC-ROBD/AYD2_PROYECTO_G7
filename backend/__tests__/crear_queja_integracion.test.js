import request from 'supertest';
import app from '../index.test.mjs';
import db from '../utils/db_connection.mjs';

jest.mock('../utils/db_connection.mjs', () => ({
    query: jest.fn(),
}));

/* 
    Prueba de integración para registrar queja
    Módulos involucrados:
        Cliente
        Cuenta
        Queja
    Integración:
        Verificación de cliente
        Registro de queja
*/

describe('pruebas de integración hacer una solicitud de cancelación', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    

    


    test('POST /registro_queja - Registrar queja', async () => {
        const res = await request(app).post('/registro_queja').send({ cui: 1223, categoria: 'A', descripcion: 'No me gusta el servicio', crea: 'Eduardo' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 200);
        expect(res.body).toHaveProperty('message', 'Queja registrada con éxito. No se pudo enviar el correo electrónico');
    });

    

    

    
    
});
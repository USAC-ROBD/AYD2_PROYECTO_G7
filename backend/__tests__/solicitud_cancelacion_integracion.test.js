import request from 'supertest';
import app from '../index.test.mjs';
import db from '../utils/db_connection.mjs';

jest.mock('../utils/db_connection.mjs', () => ({
    query: jest.fn(),
}));

/* 
    Prueba de integración para Cancelación de servicios
    Módulos involucrados:
        Cliente
        Cuenta
        Tarjeta
    Integración:
        Verificacion de cuenta
*/

describe('pruebas de integración hacer una solicitud de cancelación', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    

    


    test('POST /consultar_datos_tarjeta - Consultar datos de tarjeta', async () => {
        const res = await request(app).post('/consultar_datos_tarjeta').send({ cuenta: 12121 });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('status', 500);
        expect(res.body).toHaveProperty('message', '(intermediate value) is not iterable');
    });

    test('POST /solicitud_cancelacion - Cancelacion de servicios', async () => {
        const res = await request(app).post('/solicitud_cancelacion').send({ tipo_servicio: 'C', cui: 234566, idCuenta: 66733, descripcion: 'ya no quiero esa cuenta', crea: 'test' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 200);
        expect(res.body).toHaveProperty('message', 'Solicitud de cancelación de tarjeta creada');
    });

    

    
    
});
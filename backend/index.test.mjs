// Configuración de archivos de pruebas
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/router.mjs';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(router);

let server;

app.set('port', 4000 + Math.floor(Math.random() * 1000));

beforeAll(() => {
    server = app.listen(app.get('port'), () => {
        console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
    });
});

afterAll((done) => {
    server.close(() => {
        console.log('Servidor cerrado');
        done();
    });
});

export default app;
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes/router.mjs';
import configurations from './utils/configurations.mjs';

const app = express();

// Configurar CORS para permitir cookies
const corsOptions = {
    origin: process.env.FRONT_URL,  // La URL de tu frontend (React)
    credentials: true, // Permitir el envío de cookies
  };

// Middleware para parsear cookies
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Ver peticiones en consola
app.use(cors(corsOptions)); // Habilitamos CORS
app.use(express.json({ limit: '50mb' })); // Ajustamos el limite de subida de archivos a 50mb
app.use(express.json());
app.use(router);

app.set('port', configurations.port || 4000);

export default app;
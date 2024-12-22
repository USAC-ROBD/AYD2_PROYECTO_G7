import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes/router.mjs';
import configurations from './utils/configurations.mjs';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://3.86.208.255', 'http://localhost:4000']; // Agrega más orígenes si es necesario
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // Permitir el envío de cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  exposedHeaders: ['Authorization'], // Cabeceras expuestas al frontend
};

// Middlewares
app.use(cookieParser()); // Parsear cookies
app.use(express.urlencoded({ extended: true })); // Parsear datos en URL
app.use(morgan('dev')); // Ver peticiones en consola
app.use(cors(corsOptions)); // Configurar CORS
app.use(express.json({ limit: '50mb' })); // Ajustar límite de subida de archivos a 50MB

// Rutas
app.use(router);

// Configuración del puerto
app.set('port', configurations.port || 4000);

export default app;
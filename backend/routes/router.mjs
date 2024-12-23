import { Router } from 'express';
import { test } from '../controllers/ejemplo.mjs';
import { Consultas } from '../controllers/Consultas.mjs';
import { pagoServicios } from '../controllers/pagoServicios.mjs';
import { pagoPrestamos } from '../controllers/pagoPrestamos.mjs';
import { auth } from '../controllers/auth.mjs';
import { administrador } from '../controllers/administrador.mjs'

const router = Router();
//rutas de la api

/******Ejemplo*********/
router.get('/', test.ejemplo);

/******Test de la base de datos*********/
router.get('/test_db', test.test_db);

/*******Autenticación *************/
router.post('/login', auth.login);

router.get('/buscarcuenta', Consultas.buscarcuenta)
router.post('/deposito_efectivo', test.deposito_efectivo);

/******Consultas*********/
router.get('/buscarcuenta', Consultas.buscarcuenta)
router.get('/obtenercuentas', Consultas.obtenercuentas)
router.get('/mostrarsaldo', Consultas.mostrarsaldo)
router.post('/deposito_transferencia', test.deposito_transferencia);

/******Pago de Servicios*********/

router.post('/consultar_servicio', pagoServicios.consultarServicio);
router.post('/realizar_pago_efectivo', pagoServicios.realizarPagoEfectivo);
router.post('/realizar_pago_transferencia', pagoServicios.realizarPagoTransferencia);

/*********Pago de Prestamos*********/
router.post('/consultar_prestamo', pagoPrestamos.consultarPrestamo);
router.post('/realizar_pago_prestamo_efectivo', pagoPrestamos.realizarPagoEfectivo);
router.post('/realizar_pago_prestamo_transferencia', pagoPrestamos.realizarPagoTransferencia);


router.post('/retirar_dinero', test.retirar_dinero);

router.post('/generar_token', test.generar_token);

/***********Adminitrador************/
router.get('/rol-empleado', administrador.obtener_usuario_rol);

router.post('/rol-empleado-actualizar', administrador.actualizar_usuario_rol);

router.get('/empleado', administrador.obtener_usuario);

router.post('/eliminar-empleado', administrador.eliminar_usuario);

router.post('/cambiar-contrasena',administrador.cambiar_contrasena);

router.post('/registrar-usuario',administrador.registrar_usuario)

export default router;
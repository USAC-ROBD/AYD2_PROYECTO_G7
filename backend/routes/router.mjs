import { Router } from 'express';
import { test } from '../controllers/ejemplo.mjs';
import { Consultas } from '../controllers/Consultas.mjs';
import { pagoServicios } from '../controllers/pagoServicios.mjs';
import { pagoPrestamos } from '../controllers/pagoPrestamos.mjs';
import { auth } from '../controllers/auth.mjs';
import { depositos } from '../controllers/depositos.mjs';
import { retiros } from '../controllers/retiros.mjs';
import { atencionCliente } from '../controllers/AtencionCliente.mjs'
import { cambioMoneda } from '../controllers/cambioMoneda.mjs';
import { pagoTarjeta } from '../controllers/pagoTarjeta.mjs';
import { supervisor } from '../controllers/supervisor.mjs';

const router = Router();
//rutas de la api

/******Ejemplo*********/
router.get('/', test.ejemplo);

/******Test de la base de datos*********/
router.get('/test_db', test.test_db);

/*******Autenticación*************/
router.post('/login', auth.login);

/*********Registro*********/
router.get('/confirmar_cuenta', auth.confirmation);

router.get('/buscarcuenta', Consultas.buscarcuenta)


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

/******Depositos*********/
router.post('/depositos/consultar_cuenta', depositos.consultarCuenta);
router.post('/deposito', depositos.deposito_efectivo);

/*****Retiros***********/
router.post('/retiros/consultar_cuenta', retiros.consultarCuenta);
router.post('/retiro', retiros.retiro_efectivo);


/******Cambio de Moneda ******/
router.get('/divisa/venta-usd', cambioMoneda.precioVenta);
router.post('/cambio', cambioMoneda.realizarCambioMoneda);


/******Pago de Tarjeta*********/
router.post('/tarjetas/buscar', pagoTarjeta.consultarTarjetaCredito);
router.post('/tarjetas/pagar', pagoTarjeta.registrarPagoTarjeta);


/*********Atención al cliente*********/
router.get('/obtener_cliente', atencionCliente.obtenerCliente)
router.post('/crear_cuenta_cliente', atencionCliente.crearCuentaCliente)
router.get('/obtener_cliente_cui', atencionCliente.obtenerClienteCui)
router.post('/actualizar_cliente', atencionCliente.actualizarCliente)
router.get('/obtener_cliente_cuenta', atencionCliente.obtenerClienteCuenta)
router.post('/enviar_solicitud_tarjeta', atencionCliente.enviarSolicitudTarjeta)
router.get('/obtener_tarjeta', atencionCliente.obtenerTarjeta)
router.post('/bloquear_tarjeta', atencionCliente.bloquearTarjeta)

router.post('/retirar_dinero', test.retirar_dinero);

router.post('/generar_token', test.generar_token);

/******Atención al cliente*********/
router.post('/consultar_datos_cuenta', atencionCliente.consultarDatosCuenta)
router.post('/consultar_datos_tarjeta', atencionCliente.consultarDatosTarjeta)
router.post('/solicitud_cancelacion', atencionCliente.crearSolicitudCancelacion)



/******Supervisor*********/
router.get('/obtener_quejas', supervisor.obtenerQuejas);
router.get('/obtener_administradores', supervisor.obtenerAdministradores);
router.post('/registrar_administrador', supervisor.registrarAdministrador);
router.post('/actualizar_administrador', supervisor.actualizarAdministrador);
router.post('/eliminar_administrador', supervisor.eliminarAdministrador);


export default router;
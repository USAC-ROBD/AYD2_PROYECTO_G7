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
import { administrador } from '../controllers/administrador.mjs'
import { loginSupervisor } from '../controllers/loginSupervisor.mjs';

const router = Router();
//rutas de la api

/******Ejemplo*********/
router.get('/', test.ejemplo);

/******Test de la base de datos*********/
router.get('/test_db', test.test_db);

/*******Autenticación*************/
router.post('/login', auth.login);
router.post('/login_supervisor', loginSupervisor);

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
router.post('/crear_cuenta_cliente_dolares', atencionCliente.crearCuentaClienteDolares)
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
router.post('/registro_queja', atencionCliente.registroQueja)
router.post('/registro_encuesta', atencionCliente.registroEncuesta)



/***********Adminitrador************/
router.get('/rol-empleado', administrador.obtener_usuario_rol);
router.post('/rol-empleado-actualizar', administrador.actualizar_usuario_rol);
router.get('/empleado', administrador.obtener_usuario);
router.post('/eliminar-empleado', administrador.eliminar_usuario);
router.post('/cambiar-contrasena',administrador.cambiar_contrasena);
router.post('/registrar-usuario',administrador.registrar_usuario);
router.get('/backup',administrador.backup);
/******Supervisor*********/
router.get('/obtener_encuetas', supervisor.obtenerEncuestas)
router.get('/obtener_quejas', supervisor.obtenerQuejas);
router.get('/obtener_administradores', supervisor.obtenerAdministradores);
router.post('/registrar_administrador', supervisor.registrarAdministrador);
router.post('/actualizar_administrador', supervisor.actualizarAdministrador);
router.post('/eliminar_administrador', supervisor.eliminarAdministrador);
router.get('/obtener_actividades', supervisor.obtenerActividades);
router.get('/obtener_movimientos', supervisor.obtenerMovimientos);
router.get('/obtener_disponibilidad', supervisor.obtenerDisponibilidad);
router.get('/obtener_disponibilidad_dia', supervisor.obtenerDisponibilidadDia);



export default router;
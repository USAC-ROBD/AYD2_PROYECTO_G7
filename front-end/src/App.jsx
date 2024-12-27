import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagoServicios from "./pages/Cajero/PagoServicios";
import PagoPrestamos from "./pages/Cajero/PagoPrestamos";
import Menu from "./pages/General/Menu";
import AdminEmpleado from "./pages/Adminitrador_de_Sistemas/AdminEmpleado";
import AccionAdmin from "./pages/Adminitrador_de_Sistemas/AdminAccion";
import Login from "./pages/General/Login";
import Confirmacion from "./pages/General/ConfirmarCuenta";
import HomeConsultas from "./pages/Cajero/Consultas";
import Depositos from "./pages/Cajero/Depositos";
import Retiros from "./pages/Cajero/Retiros";
import CambioMoneda from "./pages/Cajero/CambioMoneda";
import PagoTarjeta from "./pages/Cajero/PagoTarjeta";

// Supervisor
import Empleados from "./pages/Supervisor/Empleados";
import Quejas from "./pages/Supervisor/Quejas";
import Prestamos from "./pages/Supervisor/Prestamos";
import Encuestas from "./pages/Supervisor/Encuestas";
import Administradores from "./pages/Supervisor/Administradores";
import Monitoreo from "./pages/Supervisor/Monitoreo";
import Reportes from "./pages/Supervisor/Reportes";
import GestionInventario from "./pages/Supervisor/GestionInventario";
import Tarjetas from "./pages/Supervisor/Tarjetas";
import Cancelaciones from "./pages/Supervisor/Cancelaciones";

// Atencion al cliente
import FormCreacion from "./components/AtencionCliente/Cuentas/Creacion";
import FormCreacionDolares from "./components/AtencionCliente/Cuentas/CreacionDolares";
import FormActualizarInfo from "./components/AtencionCliente/Cuentas/Actualizacion";
import FormCrearTarjeta from "./components/AtencionCliente/Tarjetas/Creacion";
import FormBloqueoTarjeta from "./components/AtencionCliente/Tarjetas/Bloqueo";
import FormCancelacion from "./pages/Cuentas/FormCancelacion";
import CreacionQueja from "./pages/AtencionCliente/CreacionQueja";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/confirmar-cuenta/:id" element={<Confirmacion />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pago-servicios" element={<PagoServicios />} />
        <Route path="/pago-prestamos" element={<PagoPrestamos />} />
        <Route path="/pago-tarjeta" element={<PagoTarjeta />} />
        <Route path="/modulo-consultas" element={<HomeConsultas />} />
        <Route path="/cambio-moneda" element={<CambioMoneda />} />
      </Routes>
      <Routes>
        <Route path="/modulo-depositos" element={<Depositos />} />
        <Route path="/modulo-retiro" element={<Retiros />} />
      </Routes>
      <Routes>
        <Route path="/creacion-cuenta" element={<FormCreacion />} />
        <Route
          path="/creacion-cuenta-dolares"
          element={<FormCreacionDolares />}
        />
        <Route path="/actualizacion-cliente" element={<FormActualizarInfo />} />
        <Route path="/creacion-tarjeta" element={<FormCrearTarjeta />} />
        <Route path="/bloqueo-tarjeta" element={<FormBloqueoTarjeta />} />
        <Route path="/cancelar-servicio" element={<FormCancelacion />} />
        <Route path="/registrar-queja" element={<CreacionQueja />} />
      </Routes>
      <Routes>
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/quejas" element={<Quejas />} />
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/encuestas" element={<Encuestas />} />
        <Route path="/administradores" element={<Administradores />} />
        <Route path="/monitoreo" element={<Monitoreo />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/gestion-inventario" element={<GestionInventario />} />
        <Route path="/tarjetas" element={<Tarjetas />} />
        <Route path="/cancelaciones" element={<Cancelaciones />} />
      </Routes>
      <Routes>
        <Route path="/menu-admin-empleado" element={<AdminEmpleado />} />
        <Route path="/accion-admin" element={<AccionAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

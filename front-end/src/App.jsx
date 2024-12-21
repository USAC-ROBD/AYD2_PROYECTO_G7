import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagoServicios from "./pages/Cajero/PagoServicios";
import PagoPrestamos from "./pages/Cajero/PagoPrestamos";
import Menu from "./pages/General/Menu";
import Login from "./pages/General/Login";
import HomeConsultas from "./pages/Cajero/Consultas";
import Depositos from './pages/Cajero/Depositos';
import Retiros from "./pages/Cajero/Retiros";

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
import FormActualizarInfo from "./components/AtencionCliente/Cuentas/Actualizacion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pago-servicios" element={<PagoServicios />} />
        <Route path="/pago-prestamos" element={<PagoPrestamos />} />
        <Route path="/modulo-consultas" element={<HomeConsultas />} />
      </Routes>
      <Routes>
        <Route path="/modulo-depositos" element={<Depositos/>} />
        <Route path="/modulo-retiro" element={<Retiros />} />
      </Routes>
      <Routes>
        <Route path="/creacion-cuenta" element={<FormCreacion/>} />
        <Route path="/actualizacion-cliente" element={<FormActualizarInfo/>} />
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
    </Router>
  );
}

export default App;

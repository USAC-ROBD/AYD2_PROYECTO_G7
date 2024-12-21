import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagoServicios from "./pages/Cajero/PagoServicios";
import PagoPrestamos from "./pages/Cajero/PagoPrestamos";
import Menu from "./pages/General/Menu";
import Login from "./pages/General/Login";
import HomeConsultas from "./pages/Cajero/Consultas";
import Depositos from './pages/Cajero/Depositos';
import FormRetiro from './pages/Retiros/FormRetiro'
import MetodoRetiro from './pages/Retiros/MetodoRetiro'

// Supervisor
import Empleados from "./pages/Supervisor/Empleados";
import Quejas from "./pages/Supervisor/Quejas";

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
        <Route path="/form-retiro" element={<FormRetiro/>}/>
      </Routes>
      <Routes>
        <Route path="/metodo-retiro" element={<MetodoRetiro/>} />
      </Routes>

      {/* Supervisor */}
      <Routes>
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/quejas" element={<Quejas />} />
      </Routes>
    </Router>
  );
}

export default App;

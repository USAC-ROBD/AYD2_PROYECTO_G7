import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePagos from "./pages/Pagos/HomePagos";
import PagoServicios from "./pages/Pagos/PagoServicios";
import PagoPrestamos from "./pages/Pagos/Prestamos/PagoPrestamos";
import MetodoPago from "./pages/Pagos/MetodoPago";
import FormPagoServicios from "./pages/Pagos/FormPagoServicios";
import Menu from "./pages/General/Menu";
import Login from "./pages/General/Login";
import HomeConsultas from "./pages/Consultas/HomeConsultas";
import FormConsulta from "./pages/Consultas/FormConsulta";
import MetodoPagoPrestamos from "./pages/Pagos/Prestamos/MetodoPagoPrestamos";
import FormPagoPrestamos from "./pages/Pagos/Prestamos/FormPagoPrestamos";
import ConfirmacionPagoServicios from "./pages/Pagos/ConfirmacionPago";
import ConfirmacionPagoPrestamos from "./pages/Pagos/Prestamos/ConfirmacionPago";
import HomeDeposito from './pages/Depositos/HomeDeposito'
import MetodoDeposito from './pages/Depositos/MetodoDeposito';
import FormDeposito from './pages/Depositos/FormDeposito';
import FormRetiro from './pages/Retiros/FormRetiro'
import MetodoRetiro from './pages/Retiros/MetodoRetiro'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/modulo-pagos" element={<HomePagos />} />
        <Route path="/pago-servicios" element={<PagoServicios />} />
        <Route path="/pago-prestamos" element={<PagoPrestamos />} />
        <Route path="/metodo-pago" element={<MetodoPago />} />
        <Route path="/form-pago-servicios" element={<FormPagoServicios />} />
        <Route path="/modulo-consultas" element={<HomeConsultas />} />
        <Route path="/form-consulta" element={<FormConsulta />} />
        <Route
          path="/metodo-pago-prestamos"
          element={<MetodoPagoPrestamos />}
        />
        <Route path="/form-pago-prestamos" element={<FormPagoPrestamos />} />
        <Route
          path="/confirmacion-pago-servicios"
          element={<ConfirmacionPagoServicios />}
        />
        <Route
          path="/confirmacion-pago-prestamos"
          element={<ConfirmacionPagoPrestamos />}
        />
      </Routes>
      <Routes>
        <Route path="/modulo-depositos" element={<HomeDeposito/>} />
        <Route path="/metodo-deposito" element={<MetodoDeposito/>} />
        <Route path="/form-deposito" element={<FormDeposito/>}/>
        <Route path="/form-retiro" element={<FormRetiro/>}/>
      </Routes>
      <Routes>
        <Route path="/metodo-retiro" element={<MetodoRetiro/>} />
      </Routes>
    </Router>
  );
}

export default App;

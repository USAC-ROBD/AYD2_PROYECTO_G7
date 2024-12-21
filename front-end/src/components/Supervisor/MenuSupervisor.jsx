import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";
import Logo from "../../assets/logo.png";
import QuejaIcon from "../../assets/queja-icon.png";
import EmpleadoIcon from "../../assets/empleado-icon.png";
import PrestamosIcon from "../../assets/prestamos-icon.png";
import EncuestaIcon from "../../assets/encuesta-icon.png";
import AdministradorIcon from "../../assets/administrador-icon.png";
import MonitorIcon from "../../assets/monitor-icon.png";
import ReporteIcon from "../../assets/reporte-icon.png";
import GestionIcon from "../../assets/gestion-icon.png";
import TarjetaIcon from "../../assets/tarjeta-icon.png";
import CancelacionIcon from "../../assets/cancelacion-icon.png";

function MenuSupervisor({ user, rol }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <img src={Logo} style={{ width: "65%" }} alt="logo" />
      <h1>Menú Principal</h1>
      <h4>Bienvenido, {user}</h4>
      <h5>Rol: {rol}</h5>
      <Row
        className="mt-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() =>
              navigate("/empleados")
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={EmpleadoIcon}
              alt="empleados-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Empleados
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() =>
              navigate("/prestamos")
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={PrestamosIcon}
              alt="prestamos-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Solicitudes de Préstamos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/encuestas")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={EncuestaIcon}
              alt="encuesta-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Encuestas de Satisfacción
          </Button>
        </Col>
      </Row>
      <Row
        className="mt-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/quejas")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={QuejaIcon}
              alt="queja-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Registro de Quejas
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/administradores")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={AdministradorIcon}
              alt="administrador-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Administradores
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/monitoreo")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={MonitorIcon}
              alt="monitor-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Monitoreo
          </Button>
        </Col>
      </Row>
      <Row
        className="mt-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/reportes")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={ReporteIcon}
              alt="reporte-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Reportes
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/gestion-inventario")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={GestionIcon}
              alt="gestion-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Gestión de Inventario Bancario
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/tarjetas")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={TarjetaIcon}
              alt="tarjeta-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Solicitudes de Tarjetas
          </Button>
        </Col>
      </Row>
      <Row
        className="mt-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/cancelaciones")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={CancelacionIcon}
              alt="cancelacion-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Cancelación de Servicios
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => {
              document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";  // Eliminar el token
              navigate("/");  // Redirigir al login
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BiArrowFromRight style={{ width: "50%", height: "50%" }} />
            Cerrar Sesión
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default MenuSupervisor;

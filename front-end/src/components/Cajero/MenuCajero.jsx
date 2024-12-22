import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";
import ServiceIcon from "../../assets/service-icon.png";
import LoanIcon from "../../assets/prestamos-icon.png";
import Logo from "../../assets/logo.png";
import DepositoIcon from "../../assets/deposito.png";
import RetiroIcon from "../../assets/retiro.png";
import ConsultasIcon from "../../assets/consultar-saldo.png";
import DivisaIcon from "../../assets/divisa.png";
import PagoTarjetaIcon from "../../assets/tarjeta-icon.png";
import { FaSearch } from 'react-icons/fa';

function MenuCajero({ user, rol }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "80vw",
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
              navigate("/pago-servicios")
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={ServiceIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Pago de Servicios
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/pago-prestamos", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={LoanIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Pago de Préstamos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/modulo-depositos')}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={DepositoIcon}
              alt="depositos-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Depósitos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/modulo-retiro")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={RetiroIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Retiros
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/modulo-consultas")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={ConsultasIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Consultas
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/cambio-moneda")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={DivisaIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Cambio de moneda
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/pago-tarjeta")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={PagoTarjetaIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Pago de Tarjeta
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

export default MenuCajero;

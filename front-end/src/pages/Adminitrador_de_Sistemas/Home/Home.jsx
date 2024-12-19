import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceIcon from "../../assets/service-icon.png";
import LoanIcon from "../../assets/prestamos-icon.png";
import Logo from "../../assets/logo.png";
import { BiArrowFromRight } from "react-icons/bi";
import DepositoIcon from "../../assets/deposito.png";
import RetiroIcon from "../../assets/retiro.png";
import SaldoIcon from "../../assets/consultar-saldo.png";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }
  , [user, navigate]);

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
      <Row
        className="mt-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() =>
              navigate("/pago-servicios", { state: { user } })
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
            onClick={() => navigate('/metodo-deposito',{state:{typeMov:'Deposito'}})}
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
      </Row>
      <Row
        className="mt-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("/metodo-retiro")}
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
            onClick={() => navigate("/modulo-consultas", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={SaldoIcon}
              alt="services-icon"
              style={{ width: "50%", height: "50%" }}
            />
            Consulta de saldo y comprobantes
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => navigate("/")}
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

export default Home;

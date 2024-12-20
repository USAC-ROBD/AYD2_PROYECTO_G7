import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";
import EmpleadoIcon from "../../assets/empleado-icon.png";
import LoanIcon from "../../assets/prestamos-icon.png";
import Logo from "../../assets/logo.png";
import DepositoIcon from "../../assets/deposito.png";
import RetiroIcon from "../../assets/retiro.png";

function MenuSupervisor({ user, rol }) {
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
              alt="services-icon"
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
            onClick={() => navigate('/metodo-deposito', { state: { typeMov: 'Deposito' } })}
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

import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiSurveyFill } from "react-icons/ri";
import { MdViewTimeline } from "react-icons/md";
import { BiArrowFromRight } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { FiInfo } from "react-icons/fi";
import { SiQuicklook } from "react-icons/si";
import { IoDocumentAttach } from "react-icons/io5";
import Logo from "../../assets/logo.png";

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
            onClick={() => navigate("",  { state: { user }})}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <RiSurveyFill style={{width:"50%", height:"50%"}}/>
            Encuestas de Satisfacción
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MdViewTimeline style={{width:"50%" , height:"50%"}}/>
            Ver Quejas
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <GrUserManager style={{width:"50%" , height:"50%"}}/>
            Registrar Administrador de Sistemas
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FiInfo style={{width:"50%" , height:"50%"}}/>
            Información de Administrador de Sistemas
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SiQuicklook style={{width:"50%" , height:"50%"}}/>
            Monitoreo de Actividad en Tiempo Real
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate("", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IoDocumentAttach style={{width:"50%" , height:"50%"}}/>
            Gestin de inventarios bancarios
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
            <BiArrowFromRight style={{ width: "50%", height: "25%" }} />
            Cerrar Sesión
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default MenuSupervisor;

// sn5LLxj8GcIJLEIt
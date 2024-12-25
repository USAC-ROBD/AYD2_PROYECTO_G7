import { Carousel, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";
import Logo from "../../assets/logo.png";
import {
  FaUserPlus,
  FaSyncAlt,
  FaCreditCard,
  FaLock,
  FaBan,
  FaDollarSign,
  FaClipboardList,
  FaHandshake,
  FaCommentDots,
} from "react-icons/fa";

function MenuCajero({ user, rol }) {
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
      <Carousel
        className="mt-4 w-75"
        nextIcon={
          <span
            className="carousel-control-next-icon"
            style={{ color: "#28a745" }}
          />
        }
        prevIcon={
          <span
            className="carousel-control-prev-icon"
            style={{ color: "#28a745" }}
          />
        }
      >
        <Carousel.Item>
          <Row
            className="g-4 justify-content-center"
            style={{
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                onClick={() => navigate("/creacion-cuenta")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaUserPlus style={{ width: "40%", height: "40%" }} />
                Nuevas Cuentas
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                onClick={() => navigate("/actualizacion-cliente")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaSyncAlt style={{ width: "40%", height: "40%" }} />
                Actualizaciones
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                onClick={() => navigate("/creacion-tarjeta")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaCreditCard style={{ width: "40%", height: "40%" }} />
                Nuevas Tarjetas
              </Button>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row
            className="g-4 justify-content-center"
            style={{
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                onClick={() => navigate("/bloqueo-tarjeta")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaLock style={{ width: "40%", height: "40%" }} />
                Bloqueos
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                onClick={() => navigate("/cancelar-servicio")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaBan style={{ width: "40%", height: "40%" }} />
                Cancelaciones
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                // onClick={() => navigate('/form-consulta')}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaDollarSign style={{ width: "40%", height: "40%" }} />
                Cambio a Dólar
              </Button>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row
            className="g-4 justify-content-center"
            style={{
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                // onClick={() => navigate('/form-consulta')}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaClipboardList style={{ width: "40%", height: "40%" }} />
                Encuesta
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                // onClick={() => navigate('/form-consulta')}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaHandshake style={{ width: "40%", height: "40%" }} />
                Préstamos
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Button
                variant="outline-success"
                size="lg"
                className="w-100"
                // onClick={() => navigate('/form-consulta')}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaCommentDots style={{ width: "40%", height: "40%" }} />
                Quejas
              </Button>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
        <Row className="g-4 justify-content-center"
            style={{
              justifyContent: "center",
              width: "100%",
            }}>
          <Col xs={12} sm={6} md={4} className="mb-3">
            <Button
              variant="outline-success"
              size="lg"
              className="w-100"
              onClick={() => navigate("/creacion-cuenta-dolares")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaDollarSign style={{ width: "40%", height: "40%" }} />
              Nuevas Cuentas Dolares
            </Button>
          </Col>
        </Row>
        </Carousel.Item>
      </Carousel>
      <Row
        className="mt-4"
        style={{
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              navigate("/", { state: { user } });
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BiArrowFromRight style={{ width: "40%", height: "40%" }} />
            Cerrar Sesión
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default MenuCajero;

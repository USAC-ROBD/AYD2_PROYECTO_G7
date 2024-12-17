import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';  // Importamos la librería para decodificar el JWT
import ServiceIcon from "../../assets/service-icon.png";
import LoanIcon from "../../assets/prestamos-icon.png";
import Logo from "../../assets/logo.png";
import { BiArrowFromRight } from "react-icons/bi";
import DepositoIcon from "../../assets/deposito.png";
import RetiroIcon from "../../assets/retiro.png";
import SaldoIcon from "../../assets/consultar-saldo.png";

function Menu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // State para almacenar el usuario
  const [rol, setRol] = useState(null);  // State para almacenar el rol del usuario

  useEffect(() => {
    // Intentamos obtener el token desde las cookies (o desde el localStorage si lo prefieres)
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"  // Extraemos el token de las cookies
    );

    // Si el token existe, decodificamos la información
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodificamos el JWT
        setUser(decodedToken.username); // Asumimos que el username está en el token
        setRol(decodedToken.rol); // Asumimos que el rol está en el token
      } catch (error) {
        console.error("Token inválido o expirado");
        navigate("/");  // Redirigir al login si el token no es válido
      }
    } else {
      console.error("No hay token");
      navigate("/");  // Redirigir al login si no hay token
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;  // Muestra un cargando mientras se decodifica el token
  }

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

export default Menu;

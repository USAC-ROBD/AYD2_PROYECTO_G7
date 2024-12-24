import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from "react-icons/bi";
import { BsPersonSquare } from "react-icons/bs";
import { IoIosCloudUpload } from "react-icons/io";
import Logo from "../../assets/logo.png";
import useAuth from "../../hook/useAuth";

function MenuAdmin() {
  const navigate = useNavigate();
  const { user, rol } = useAuth();

  if (!user || !rol) {
    return <div>Loading...</div>;
  }

  const downloadBackup = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/backup`);
      if (!response.ok) {
        throw new Error('Error al generar el respaldo');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.sql'; // Nombre del archivo descargado
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el respaldo:', error);
      alert('No se pudo descargar el respaldo. Inténtelo nuevamente.');
    }
  };

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
            onClick={() => navigate("/menu-admin-empleado", { state: { user } })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BsPersonSquare style={{ width: "50%", height: "50%" }} />
            Empleados
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={downloadBackup}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IoIosCloudUpload style={{ width: "50%", height: "50%" }} />
            Copias de seguridad
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              navigate("/");
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

export default MenuAdmin;

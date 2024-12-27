import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/logo.png";
import useAuth from "../../hook/useAuth";
import RegistroQueja from "../../components/AtencionCliente/Servicios/RegistroQueja";

function CreacionQueja() {
  const navigate = useNavigate();
  const { user, rol } = useAuth(); // Usamos el hook personalizado para obtener el usuario y rol
  const [showComponent, setShowComponent] = useState("RegistroQueja"); // Estado para saber que componente mostrar

  if (!user || !rol) {
    return <div>Loading...</div>; // Muestra un cargando mientras se obtiene el usuario
  }

  // Si el rol no es Servicio al ciente, redirigimos al menu principal
  if (rol !== 4) {
    // 4 es el ID del rol de encargado de servicio al cliente
    navigate("/menu");
  }

  const handleRegistroQueja = (data) => {
    setShowComponent("RegistroQueja"); // Cambiamos el componente a mostrar a RegistroQueja s
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "75vh",
      }}
    >
      <img src={Logo} style={{ width: "65%" }} alt="logo" />

      {/* Mostramos el componente FormularioPago */}
      {showComponent == "RegistroQueja" && (
        <RegistroQueja handleRegistroQueja={handleRegistroQueja} user={user} />
      )}
    </div>
  );
}

export default CreacionQueja;

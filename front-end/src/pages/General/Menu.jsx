import { useNavigate } from "react-router-dom";
import MenuCajero from "../../components/Cajero/MenuCajero";
import MenuAdmin from "../../components/Administrador/Menu";
import MenuSupervisor from "../../components/Supervisor/Menu"
import useAuth from "../../hook/useAuth";  // Importamos el hook personalizado

function Menu() {
  const navigate = useNavigate();
  const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol

  if (!user || !rol) {
    return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
  }

  // Renderiza el menú correspondiente según el rol
  switch (rol) {
    case 1:
      // return <MenuCajero user={user} rol="Cajero" />;
      return <MenuAdmin user={user} rol="Administrador" />;
    case 2:
      return <MenuCajero user={user} rol="Cajero" />;
    case 3:
      return <MenuSupervisor user={user} rol="Supervisor"/>;
    default:
      // Redirige si el rol no es válido
      navigate("/");
      return null;
  }
}

export default Menu;

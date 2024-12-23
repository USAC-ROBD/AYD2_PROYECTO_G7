import { useNavigate } from "react-router-dom";
import RegistroEmpleado from '../../components/Administrador/RegistroEmpleado'
import AsignacionRol from '../../components/Administrador/AsigancionRol'
import CambioContraseña from '../../components/Administrador/CambioContraseña'
import EliminarEmpleado from '../../components/Administrador/EliminarEmpleado'
import { useLocation } from 'react-router-dom';
import useAuth from "../../hook/useAuth";  // Importamos el hook 
// personalizado

function AdminAccion() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state?.accion;
  const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol

  if (!user || !rol) {
    return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
  }

  // Renderiza el menú correspondiente según el rol
  switch (state) {
    case 'RegistroEmpleado':
      // return <MenuCajero user={user} rol="Cajero" />;
      return <RegistroEmpleado user={user} rol="Administrador" />;
    case 'AsignacionRol':
      return <AsignacionRol user={user} rol="Administrador"/>;
    case 'EliminarEmpleado':
      return <EliminarEmpleado user={user} rol="Administrador"/>
    case 'CambioContraseña':
      return <CambioContraseña user={user} rol="Administrador"/>;
    default:
      // Redirige si el rol no es válido
      navigate("/");
      return null;
  }
}

export default AdminAccion;

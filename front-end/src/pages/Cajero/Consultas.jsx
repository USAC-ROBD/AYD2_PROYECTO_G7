import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import TipoConsultas from '../../components/Cajero/Consultas/TipoConsulta';
import FormConsulta from "../../components/Cajero/Consultas/FormConsulta";

export default function HomeConsultas() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [tipoConsulta, setTipoConsulta] = useState();  // Estado para guardar el tipo de consulta seleccionado
    const [showComponent, setShowComponent] = useState("TipoConsulta");  // Estado para saber que componente mostrar

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es cajero, redirigimos al menu principal
    if (rol !== 2) { // 2 es el ID del rol cajero
        navigate('/menu');
    }

    const handleSelectTipoConsulta = (tipo) => {
        setTipoConsulta(tipo);
        setShowComponent("FormConsulta"); // Cambiamos el componente a mostrar a FormConsulta
        console.log(tipo);        
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%'}} alt="logo" />
            <h1>Módulo de Consultas</h1>

            {/* Mostramos el componente TipoConsulta */}
            {showComponent == "TipoConsulta" && (
                <TipoConsultas handleSelectTipoConsulta={handleSelectTipoConsulta} />
            )}

            {/* Mostramos el componente FormConsulta */}
            {showComponent == "FormConsulta" && (
                <FormConsulta query={tipoConsulta} />
            )}
           
        </div>
    );
}
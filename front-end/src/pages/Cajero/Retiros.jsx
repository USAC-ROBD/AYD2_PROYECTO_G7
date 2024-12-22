import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import FormRetiro from '../../components/Cajero/Retiros/FormRetiro';
import ConfirmacionRetiro from '../../components/Cajero/Retiros/ConfirmacionRetiro';

function Retiros() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [dataRetiro, setDataRetiro] = useState();  // Estado para guardar los datos del retiro confirmado
    const [showComponent, setShowComponent] = useState("FormularioRetiro");  // Estado para saber qué componente mostrar

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es cajero, redirigimos al menú principal
    if (rol !== 2) { // 2 es el ID del rol cajero
        navigate('/menu');
    }

    const handleConfirmacionRetiro = (data) => {
        setDataRetiro(data);
        setShowComponent("ConfirmacionRetiro"); // Cambiamos el componente a mostrar a ConfirmacionRetiro
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '75vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            {/* Mostramos el componente FormularioRetiro */}
            {showComponent === "FormularioRetiro" && (
                <FormRetiro handleConfirmacionRetiro={handleConfirmacionRetiro} user={user} />
            )}

            {/* Mostramos el componente ConfirmacionRetiro */}
            {showComponent === "ConfirmacionRetiro" && (
               <ConfirmacionRetiro data={dataRetiro} />
            )}
        </div>
    );
}

export default Retiros;

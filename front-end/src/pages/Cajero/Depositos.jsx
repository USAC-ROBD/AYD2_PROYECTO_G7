import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import FormDeposito from '../../components/Cajero/Depositos/FormDeposito';
import ConfirmacionDeposito from '../../components/Cajero/Depositos/ConfirmacionDeposito';

function Depositos() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [dataPago, setDataPago] = useState();  // Estado para guardar los datos del pago confirmado
    const [showComponent, setShowComponent] = useState("FormularioDeposito");  // Estado para saber que componente mostrar

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es cajero, redirigimos al menu principal
    if (rol !== 2) { // 2 es el ID del rol cajero
        navigate('/menu');
    }

    const handleConfirmacionDeposito = (data) => {
        setDataPago(data);
        setShowComponent("ConfirmacionDeposito"); // Cambiamos el componente a mostrar a ConfirmacionPago
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '75vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />


            {/* Mostramos el componente FormularioPago */}
            {showComponent == "FormularioDeposito" && (
                <FormDeposito handleConfirmacionDeposito={handleConfirmacionDeposito} user={user} />
            )}

            {/* Mostramos el componente ConfirmacionPago */}
            {showComponent == "ConfirmacionDeposito" && (
                <ConfirmacionDeposito data={dataPago} />
            )}

        </div>
    );
}

export default Depositos;

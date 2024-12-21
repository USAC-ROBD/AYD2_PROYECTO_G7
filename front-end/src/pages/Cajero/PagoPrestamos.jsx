import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import TipoPago from '../../components/Cajero/PagoPrestamos/TipoPago';
import FormPagoPrestamos from '../../components/Cajero/PagoPrestamos/FormPagoPrestamos';
import ConfirmacionPagoPrestamos from '../../components/Cajero/PagoPrestamos/ConfirmacionPagoPrestamos';

function PagoPrestamos() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [tipoPago, setTipoPago] = useState();  // Estado para guardar el tipo de servicio seleccionado
    const [dataPago, setDataPago] = useState();  // Estado para guardar los datos del pago confirmado
    const [showComponent, setShowComponent] = useState("TipoPago");  // Estado para saber que componente mostrar

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es cajero, redirigimos al menu principal
    if (rol !== 2) { // 2 es el ID del rol cajero
        navigate('/menu');
    }

    const handleSelectTipoPago = (tipo) => {
        setTipoPago(tipo);
        setShowComponent("FormularioPago"); // Cambiamos el componente a mostrar el formulario de pago
    }

    const handleConfirmacionPago = (data) => {
        setDataPago(data);
        setShowComponent("ConfirmacionPago"); // Cambiamos el componente a mostrar a ConfirmacionPago
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '75vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            {/* Mostramos el componente TipoPago */}
            {showComponent == "TipoPago" && (
                <TipoPago handleSelectTipoPago={handleSelectTipoPago} />
            )}

            {/* Mostramos el componente FormularioPago */}
            {showComponent == "FormularioPago" && (
                <FormPagoPrestamos handleConfirmacionPago={handleConfirmacionPago} user={user} tipoPago={tipoPago}/>
            )}

            {/* Mostramos el componente ConfirmacionPago */}
            {showComponent == "ConfirmacionPago" && (
                <ConfirmacionPagoPrestamos dataPago={dataPago} />   
            )}

        </div>
    );
}

export default PagoPrestamos;

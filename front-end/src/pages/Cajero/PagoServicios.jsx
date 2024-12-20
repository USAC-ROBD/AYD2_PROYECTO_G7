import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import TipoServicio from '../../components/Cajero/PagoServicios/TipoServicio';
import MetodoPago from '../../components/Cajero/PagoServicios/MetodoPago';
import FormPagoServicios from '../../components/Cajero/PagoServicios/FormPagoServicios';
import ConfirmacionPagoServicios from '../../components/Cajero/PagoServicios/ConfirmacionPago';

function PagoServicios() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [tipoServicio, setTipoServicio] = useState();  // Estado para guardar el tipo de servicio seleccionado
    const [metodoPago, setMetodoPago] = useState();  // Estado para guardar el método de pago seleccionado
    const [dataPago, setDataPago] = useState();  // Estado para guardar los datos del pago confirmado
    const [showComponent, setShowComponent] = useState("TipoServicio");  // Estado para saber que componente mostrar

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es cajero, redirigimos al menu principal
    if (rol !== 2) { // 2 es el ID del rol cajero
        navigate('/menu');
    }

    const handleSelectTipoServicio = (tipo) => {
        setTipoServicio(tipo);
        setShowComponent("MetodoPago"); // Cambiamos el componente a mostrar a MetodoPago
    }

    const handleSelectMetodoPago = (metodo) => {
        setMetodoPago(metodo);
        setShowComponent("FormularioPago"); // Cambiamos el componente a mostrar a FormularioPago
    }

    const handleConfirmacionPago = (data) => {
        setDataPago(data);
        setShowComponent("ConfirmacionPago"); // Cambiamos el componente a mostrar a ConfirmacionPago
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '75vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            {/* Mostramos el componente TipoServicio */}
            {showComponent == "TipoServicio" && (
                <TipoServicio onSelectTipoServicio={handleSelectTipoServicio} />
            )}

            {/* Mostramos el componente MetodoPago */}
            {showComponent == "MetodoPago" && (
                <MetodoPago handleSelectTipoPago={handleSelectMetodoPago} />
            )}

            {/* Mostramos el componente FormularioPago */}
            {showComponent == "FormularioPago" && (
                <FormPagoServicios handleConfirmacionPago={handleConfirmacionPago} user={user} service={tipoServicio} paymentMethod={metodoPago} />
            )}

            {/* Mostramos el componente ConfirmacionPago */}
            {showComponent == "ConfirmacionPago" && (
                <ConfirmacionPagoServicios dataPago={dataPago} />   
            )}

        </div>
    );
}

export default PagoServicios;

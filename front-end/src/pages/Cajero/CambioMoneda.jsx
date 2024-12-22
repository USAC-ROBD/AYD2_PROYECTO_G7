import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hook/useAuth';
import FormCambioMoneda from '../../components/Cajero/CambioMoneda/FormCambioMoneda';
import ConfirmacionCambioMoneda from '../../components/Cajero/CambioMoneda/ConfirmacionCambioMoneda';

function CambioMoneda() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();
    const [dataCambio, setDataCambio] = useState(null);
    const [showComponent, setShowComponent] = useState("FormCambioMoneda");

    if (!user || !rol) {
        return <div>Loading...</div>;
    }

    // Redirigir si el rol no es válido (puedes ajustar el ID del rol según sea necesario)
    if (rol !== 2) {
        navigate('/menu');
    }

    const handleConfirmacionCambio = (data) => {
        setDataCambio(data);
        setShowComponent("ConfirmacionCambioMoneda");
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '75vh' }}>
            {showComponent === "FormCambioMoneda" && (
                <FormCambioMoneda onConfirmacionCambio={handleConfirmacionCambio} user={user} />
            )}
            {showComponent === "ConfirmacionCambioMoneda" && (
                <ConfirmacionCambioMoneda data={dataCambio} />
            )}
        </div>
    );
}

export default CambioMoneda;

import React, { useState } from 'react';
import FormPagoTarjeta from '../../components/Cajero/PagoTarjeta/FormPagoTarjeta';
import ConfirmacionPagoTarjeta from '../../components/Cajero/PagoTarjeta/ConfirmacionPagoTarjeta';
import useAuth from '../../hook/useAuth';

function PagoTarjeta() {
    const [dataPago, setDataPago] = useState(null);
    const { user, rol } = useAuth();

    const handleConfirmacionPago = (data) => {
        setDataPago(data); // Datos enviados desde el formulario
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100vw', minHeight: '75vh' }}>
            {!dataPago ? (
                <FormPagoTarjeta onConfirmacionPago={handleConfirmacionPago} user={user} />
            ) : (
                <ConfirmacionPagoTarjeta data={dataPago} />
            )}
        </div>
    );
}

export default PagoTarjeta;

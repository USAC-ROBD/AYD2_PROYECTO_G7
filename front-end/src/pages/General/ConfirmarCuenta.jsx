import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function Confirmacion() {
    const params = useParams()
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const confirmation = async () => {
        try {
            const { id } = params

            const response = await fetch(`${import.meta.env.VITE_API_HOST}/confirmar_cuenta?id=${id}`)
            const result = await response.json()

            if (result.status === 200) {
                setShowSuccess(true)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
        } catch (error) {
            setShowError(true)
        }
    }

    useEffect(() => {
        confirmation()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <Alert show={showError} variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Error al confirmar la cuenta</Alert.Heading>
                <p>
                    Ha ocurrido un error al confirmar la cuenta, por favor intente nuevamente.
                </p>
            </Alert>
            <Alert show={showSuccess} variant="success" onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>Cuenta confirmada</Alert.Heading>
                <p>
                    La cuenta ha sido confirmada exitosamente.
                </p>
            </Alert>
        </div>
    );
}

export default Confirmacion;
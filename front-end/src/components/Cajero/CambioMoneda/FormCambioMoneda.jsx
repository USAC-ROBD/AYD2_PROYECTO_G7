import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function FormCambioMoneda({ onConfirmacionCambio, user }) {
    const navigate = useNavigate();
    const [monto, setMonto] = useState('');
    const [cui, setCui] = useState('');
    const [montoEquivalente, setMontoEquivalente] = useState(0); // Monto en dólares
    const [precioVentaDolar, setPrecioVentaDolar] = useState(0); // Precio de venta del dólar

    useEffect(() => {
        // Consultar el precio de venta del dólar desde la API
        const fetchPrecioDolar = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/divisa/venta-usd`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await response.json();

                if (data.status === 200) {
                    setPrecioVentaDolar(data.valorVenta);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo obtener el precio del dólar.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } catch (error) {
                console.error('Error al consultar el precio del dólar:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error al consultar el precio del dólar.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        };

        fetchPrecioDolar();
    }, []);

    useEffect(() => {
        // Calcular el monto equivalente en dólares
        if (monto && precioVentaDolar > 0) {
            const equivalente = monto / precioVentaDolar;
            setMontoEquivalente(equivalente.toFixed(2)); // Redondear a dos decimales
        } else {
            setMontoEquivalente(0);
        }
    }, [monto, precioVentaDolar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!cui) {
            Swal.fire({
                title: 'Error',
                text: 'Debe ingresar el CUI del cliente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            return;
        }
    
        if (monto <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'El monto debe ser mayor a 0.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            return;
        }
    
        const data = {
            monto,
            cui,
            monedaOrigen: 'Q',
            monedaDestino: 'D',
            crea: user,
        };
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/cambio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                Swal.fire({
                    title: 'Cambio realizado con éxito',
                    text: `ID del Cambio: ${result.cambioId}\nMonto en Dólares: $${result.montoEquivalente}`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
    
                onConfirmacionCambio({
                    cambioId: result.cambioId,
                    monto,
                    montoEquivalente: result.montoEquivalente,
                    cui,
                    monedaOrigen: 'Quetzales',
                    monedaDestino: 'Dólares',
                    precioVentaDolar: result.precioVentaDolar,
                    crea: user,
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: result.message || 'Ocurrió un error al realizar el cambio.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error('Error al realizar el cambio:', error);
            Swal.fire({
                title: 'Error',
                text: 'Error al realizar el cambio. Por favor, intente nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };
    

    return (
        <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
            <Col md={8}>
                <Card>
                    <Card.Header className="bg-primary text-white text-center">
                        <h4>Cambio de Moneda</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>CUI del Cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el CUI del cliente"
                                    value={cui}
                                    onChange={(e) => setCui(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Monto en Quetzales</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese el monto en Quetzales"
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Precio de Venta del Dólar</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={`Q ${precioVentaDolar}`}
                                    readOnly
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Monto en Dólares</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={`$ ${montoEquivalente}`}
                                    readOnly
                                    disabled
                                />
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="success" type="submit">
                                    Realizar Cambio
                                </Button>
                            </div>

                            <div className="d-grid mt-2">
                                <Button variant="danger" type='button' onClick={() => navigate('/menu')}>
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FormCambioMoneda;

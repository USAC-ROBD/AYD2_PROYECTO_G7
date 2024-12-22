import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

function FormPagoTarjeta({ onConfirmacionPago, user }) {
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [montoUso, setMontoUso] = useState(75); // Inicializado para quetzales
    const [montoDeuda, setMontoDeuda] = useState(0);
    const [intereses, setIntereses] = useState(0);
    const [idTarjeta, setIdTarjeta] = useState(null);
    const [totalPagar, setTotalPagar] = useState(0);
    const [moneda, setMoneda] = useState('Q'); // Moneda de la tarjeta

    const handleBuscarTarjeta = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/tarjetas/buscar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ numeroTarjeta }),
            });
            const data = await response.json();

            if (data.status === 200) {
                const { saldoOriginal, intereses, saldoTotal, idTarjeta, moneda } = data.data;
                setMontoDeuda(saldoOriginal);
                setIntereses(intereses);
                setMoneda(moneda);
                setMontoUso(moneda === 'D' ? 10 : 75); // 10 USD o 75 Q
                setTotalPagar(parseFloat(saldoTotal) + parseFloat(moneda === 'D' ? 10 : 75));
                setIdTarjeta(idTarjeta);
            } else {
                Swal.fire('Error', data.message, 'error');
                setIdTarjeta(null);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo buscar la tarjeta', 'error');
            setIdTarjeta(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idTarjeta) {
            Swal.fire('Error', 'Debe buscar y seleccionar una tarjeta válida.', 'error');
            return;
        }

        const data = { idTarjeta, montoUso, montoDeuda, intereses, totalPagar, moneda, crea: user };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/tarjetas/pagar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.status === 200) {
                Swal.fire('Éxito', 'Pago registrado con éxito', 'success');
                onConfirmacionPago({ ...data, idPago: result.idPago, numeroTarjeta });
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo registrar el pago', 'error');
        }
    };

    return (
        <Row className="justify-content-center" style={{ width: '100%', padding: '15%' }}>
            <Col md={8}>
                <Card>
                    <Card.Header className="bg-primary text-white text-center">
                        <h4>Pago de Tarjeta</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de Tarjeta</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el número de tarjeta"
                                    value={numeroTarjeta}
                                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button className="mb-3" onClick={handleBuscarTarjeta}>
                                Buscar Tarjeta
                            </Button>

                            <Form.Group className="mb-3">
                                <Form.Label>Monto Fijo por Uso de Tarjeta</Form.Label>
                                <Form.Control type="text" value={`${moneda} ${montoUso}`} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Monto de Deuda</Form.Label>
                                <Form.Control type="text" value={`${moneda} ${montoDeuda}`} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Intereses</Form.Label>
                                <Form.Control type="text" value={`${moneda} ${intereses}`} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Total a Pagar</Form.Label>
                                <Form.Control type="text" value={`${moneda} ${totalPagar}`} readOnly />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Registrar Pago
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FormPagoTarjeta;

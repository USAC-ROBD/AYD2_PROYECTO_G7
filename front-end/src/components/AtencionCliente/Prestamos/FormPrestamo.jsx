import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Logo from '../../../assets/logo.png';
import Swal from 'sweetalert2';

export default function FormSolicitudPrestamo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        numeroCuenta: '',
        tipoPrestamo: '',
        montoSolicitado: '',
        plazo: '',
        documentacion: null,
        cliente: '',
        idcuenta: '',
        cui: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64File = reader.result.split(",")[1];
                setFormData({
                    ...formData,
                    documentacion: base64File,
                });
            };

            reader.onerror = () => {};

            reader.readAsDataURL(file);
        }
    };

    const handleOut = async (e) => {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_cliente_prestamo?numeroCuenta=${e.target.value}`);

        if(response.ok) {
            const data = await response.json();

            console.log(data.cliente)

            const { CUI, NOMBRE, ID_CUENTA } = data.cliente
            setFormData({
                ...formData,
                cliente: NOMBRE,
                idcuenta: ID_CUENTA,
                cui: CUI,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "¿Confirmar envío?",
            text: "¡Por favor, verifica los datos antes de enviar la solicitud!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            dangerMode: true,
        });
        if (!result.isConfirmed) return;

        console.log(formData)

        const response = await fetch(`${import.meta.env.VITE_API_HOST}/solicitar_prestamo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            const data = await response.json();
            if(!data.pendiente) {
                Swal.fire({
                    icon: 'success',
                    title: "¡Solicitud Enviada!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleCancelar();
                return;
            }
            Swal.fire({
                icon: 'warning',
                title: "¡Hay una solicitud pendiente!",
                showConfirmButton: false,
                timer: 2000,
            });
            handleLimpiar();
            return
        }

        Swal.fire({
            icon: 'error',
            title: "¡Error al solicitar el préstamo!",
            showConfirmButton: false,
            timer: 2000,
        });
        handleLimpiar();
    };

    const handleLimpiar = () => {
        setFormData({
            numeroCuenta: '',
            tipoPrestamo: '',
            montoSolicitado: '',
            plazo: '',
            documentacion: null,
            cliente: '',
            idcuenta: '',
            cui: '',
        });
    }

    const handleCancelar = () => {
        handleLimpiar();
        navigate('/menu')
    };

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Solicitud de Préstamo</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formNumeroCuenta">
                                            <Form.Label>Número de Cuenta o Identificación</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el número de cuenta o identificación"
                                                name="numeroCuenta"
                                                value={formData.numeroCuenta}
                                                onChange={handleChange}
                                                onBlur={handleOut}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="formTipoPrestamo">
                                            <Form.Label>Tipo de Préstamo</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="tipoPrestamo"
                                                value={formData.tipoPrestamo}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccione el tipo de préstamo</option>
                                                <option value="P">Personal</option>
                                                <option value="H">Hipotecario</option>
                                                <option value="A">Automotriz</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="formCliente">
                                            <Form.Label>Cliente</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Solicitante"
                                                name="cliente"
                                                value={formData.cliente}
                                                onChange={handleChange}
                                                required
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formMontoSolicitado">
                                            <Form.Label>Monto Solicitado</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Monto solicitado"
                                                name="montoSolicitado"
                                                value={formData.montoSolicitado}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="formPlazo">
                                            <Form.Label>Plazo del Préstamo</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="plazo"
                                                value={formData.plazo}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccione el plazo</option>
                                                <option value="12">12 meses</option>
                                                <option value="24">24 meses</option>
                                                <option value="36">36 meses</option>
                                                <option value="48">48 meses</option>
                                                <option value="60">60 meses</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="formDocumentacion">
                                            <Form.Label>Documentación Requerida (PDF)</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="application/pdf"
                                                name="documentacion"
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-grid mt-4">
                                    <Button variant="primary" type="submit" block>
                                        Enviar Solicitud
                                    </Button>
                                </div>
                                <div className="d-grid mt-4">
                                    <Button variant="danger" onClick={handleCancelar} block>
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
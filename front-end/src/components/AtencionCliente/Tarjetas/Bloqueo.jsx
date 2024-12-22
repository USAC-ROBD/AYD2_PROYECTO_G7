import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo.png';
import Swal from "sweetalert2";

export default function FormBloqueoTarjeta() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idTarjeta: '',
        noTarjeta: '',
        motivoBloqueo: '',
        tipoTarjeta: '',
        preguntaSeguridad: '',
        cuiCuentaTitular: '',
        titular: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeSelect = (e) => {
        const { name, value } = e.target;
        handleLimpiar()
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOut = async (e) => {
        const { value } = e.target
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_tarjeta?cuiNumeroCuenta=${value}&tipo=${formData.tipoTarjeta}`)
        if(response.ok) {
            const data = await response.json()
            if(data.encontrado) {
                const { NUMERO, NOMBRE, ESTADO, ID_TARJETA } = data.tarjeta
                if(ESTADO === 'A') {
                    setFormData({
                        ...formData,
                        idTarjeta: ID_TARJETA,
                        noTarjeta: NUMERO,
                        titular: NOMBRE,
                    });
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "¡La tarjeta está inactiva!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    setFormData({
                        ...formData,
                        cuiCuentaTitular: '',
                    });
                }
                return
            }
        }
        setFormData({
            ...formData,
            idTarjeta: '',
            noTarjeta: '',
            titular: '',
        });
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

        const response = await fetch(`${import.meta.env.VITE_API_HOST}/bloquear_tarjeta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        if(response.ok) {
            const data = await response.json();
            if(data.bloqueada) {
                Swal.fire({
                    icon: "success",
                    title: "¡Tarjeta Bloqueada!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleCancelar();
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "¡La respuesta a la pregunta de seguridad es incorrecta!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
            return;
        }
        Swal.fire({
            icon: "error",
            title: "¡Error al bloquear la tarjeta!",
            showConfirmButton: false,
            timer: 2000,
        });
        handleLimpiar();
    };

    const handleLimpiar = () => {
        formData.noTarjeta = ''
        formData.motivoBloqueo = ''
        formData.preguntaSeguridad = ''
        formData.cuiCuentaTitular = ''
        formData.titular = ''
    }

    const handleCancelar = () => {
        handleLimpiar();
        navigate('/menu')
    };

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={10}>
                    <Card>
                        <Card.Header className="bg-danger text-white text-center">
                            <h4>Bloqueo de Tarjeta</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formTipoTarjeta">
                                            <Form.Label>Tipo de Tarjeta</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="tipoTarjeta"
                                                value={formData.tipoTarjeta}
                                                onChange={handleChangeSelect}
                                                required
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option value="C">Crédito</option>
                                                <option value="D">Débito</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    {(formData.tipoTarjeta === 'C' || formData.tipoTarjeta === 'D') && (
                                        <Col md={6}>
                                            <Form.Group controlId="formCuiTitular">
                                                <Form.Label>{formData.tipoTarjeta === 'C' ? "CUI del titular" : "Número de cuenta o CUI del titular"}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder={formData.tipoTarjeta === 'C' ? "Ingrese el CUI del titular" : "Ingrese el número de cuenta o CUI del titular"}
                                                    name="cuiCuentaTitular"
                                                    value={formData.cuiCuentaTitular}
                                                    onChange={handleChange}
                                                    onBlur={handleOut}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    )}
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formPreguntaSeguridad">
                                            <Form.Label>No. Tarjeta</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="No. Tarjeta"
                                                name="noTarjeta"
                                                value={formData.noTarjeta}
                                                onChange={handleChange}
                                                disabled
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formPreguntaSeguridad">
                                            <Form.Label>Titular</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Titular"
                                                name="titular"
                                                value={formData.titular}
                                                onChange={handleChange}
                                                disabled
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formMotivoBloqueo">
                                            <Form.Label>Motivo del Bloqueo</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="motivoBloqueo"
                                                value={formData.motivoBloqueo}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccione un motivo</option>
                                                <option value="R">Robo</option>
                                                <option value="P">Pérdida</option>
                                                <option value="F">Fraude</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formPreguntaSeguridad">
                                            <Form.Label>Respuesta a la Pregunta de Seguridad</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese la respuesta"
                                                name="preguntaSeguridad"
                                                value={formData.preguntaSeguridad}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="d-grid mt-4">
                                    <Button variant="danger" type="submit" block>
                                        Bloquear Tarjeta
                                    </Button>
                                </div>
                                <div className="d-grid mt-4">
                                    <Button variant="secondary" onClick={handleCancelar} block>
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
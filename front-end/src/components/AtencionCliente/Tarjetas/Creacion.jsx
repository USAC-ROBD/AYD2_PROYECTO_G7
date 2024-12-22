import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import Swal from "sweetalert2";

export default function FormCrearTarjeta() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tipoTarjeta: "",
        numeroCuenta: "",
        limiteCredito: "",
        cui: "",
        nombreTitular: "",
        moneda: "",
        idCuenta: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOut1 = async (e) => {
        const { value } = e.target
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_cliente?cui=${value}`)
        if(response.ok) {
            const data = await response.json()
            if(data.encontrado) {
                const { NOMBRE, APELLIDO } = data.cliente
                setFormData({
                    ...formData,
                    nombreTitular: `${NOMBRE} ${APELLIDO}`,
                });
                return
            }
        }
        setFormData({
            ...formData,
            nombreTitular: ``,
        });
    }

    const handleOut2 = async (e) => {
        const { value } = e.target;
        if (value !== "") {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_cliente_cuenta?cuenta=${value}`);
            if (response.ok) {
                const data = await response.json();
                if (data.encontrado) {
                    const { CUI, NOMBRE, MONEDA, ID_CUENTA } = data.cliente;
                    setFormData({
                        ...formData,
                        cui: CUI,
                        nombreTitular: `${CUI} - ${NOMBRE}`,
                        moneda: MONEDA,
                        idCuenta: ID_CUENTA,
                    });
                }
            }
        }
    };

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

        const response = await fetch(`${import.meta.env.VITE_API_HOST}/enviar_solicitud_tarjeta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            const data = await response.json();
            if(data.message !== 'solicitud vigente') {
                Swal.fire({
                    icon: "success",
                    title: "¡Solicitud Enviada!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleCancelar();
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "¡Ya hay una solicitud vigente!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleLimpiar();
            }
            return;
        }

        Swal.fire({
            icon: "error",
            title: "¡Error al enviar la solicitud!",
            showConfirmButton: false,
            timer: 2000,
        });
        handleLimpiar();
    };

    const handleLimpiar = () => {
        setFormData({
            tipoTarjeta: "",
            numeroCuenta: "",
            limiteCredito: "",
            cui: "",
            nombreTitular: "",
            moneda: "",
            idCuenta: "",
        });
    };

    const handleCancelar = () => {
        handleLimpiar();
        navigate("/menu");
    };

    return (
        <Container
            className="mt-5"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: "100vw", minHeight: "100vh" }}
        >
            <img src={Logo} style={{ width: "65%" }} alt="logo" />
            <Row className="justify-content-center" style={{ width: "100%", paddingLeft: "15%", paddingRight: "15%" }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Solicitud de Nueva Tarjeta</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="formTipoTarjeta">
                                            <Form.Label>Tipo de Tarjeta</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="tipoTarjeta"
                                                value={formData.tipoTarjeta}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option value="C">Crédito</option>
                                                <option value="D">Débito</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {formData.tipoTarjeta === "C" && (
                                <>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formLimiteCredito">
                                                <Form.Label>Límite de Crédito</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Ingrese el límite de crédito"
                                                    name="limiteCredito"
                                                    value={formData.limiteCredito}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formCui">
                                                <Form.Label>CUI</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ingrese el CUI"
                                                    name="cui"
                                                    value={formData.cui}
                                                    onChange={handleChange}
                                                    onBlur={handleOut1}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="formNombreTitular">
                                                <Form.Label>Nombre del Titular</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ingrese el nombre del titular"
                                                    name="nombreTitular"
                                                    value={formData.nombreTitular}
                                                    onChange={handleChange}
                                                    disabled
                                                    required
                                                />
                                                </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                                )}
                                {formData.tipoTarjeta === "D" && (
                                <>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formNumeroCuenta">
                                                <Form.Label>Número de Cuenta</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Ingrese su número de cuenta"
                                                    name="numeroCuenta"
                                                    value={formData.numeroCuenta}
                                                    onChange={handleChange}
                                                    onBlur={handleOut2}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formNombreTitular">
                                                <Form.Label>Nombre del Titular</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre del titular"
                                                    name="nombreTitular"
                                                    value={formData.nombreTitular}
                                                    onChange={handleChange}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                                )}
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
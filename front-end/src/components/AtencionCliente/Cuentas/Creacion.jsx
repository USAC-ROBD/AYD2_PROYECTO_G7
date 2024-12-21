import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Logo from '../../../assets/logo.png';

export default function FormCreacion() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cui: '',
        telefono: '',
        email: '',
        edad: '',
        genero: '',
        fotografia: null,
        tipoCuenta: '',
        preguntaSeguridad: '',
        respuestaSeguridad: '',
        monto: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleCancel = () => {
        setFormData({
            nombre: '',
            apellido: '',
            cui: '',
            telefono: '',
            email: '',
            edad: '',
            genero: '',
            fotografia: null,
            tipoCuenta: '',
            preguntaSeguridad: '',
            respuestaSeguridad: '',
            monto: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={10}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Solicitud de Nueva Cuenta</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formNombre" className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formApellido" className="mb-3">
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su apellido"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formCui" className="mb-3">
                                            <Form.Label>CUI</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese su CUI"
                                                name="cui"
                                                value={formData.cui}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formTelefono" className="mb-3">
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese su teléfono"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formEmail" className="mb-3">
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Ingrese su correo electrónico"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formEdad" className="mb-3">
                                            <Form.Label>Edad</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese su edad"
                                                name="edad"
                                                value={formData.edad}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formGenero" className="mb-3">
                                            <Form.Label>Género</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="genero"
                                                value={formData.genero}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccione su género</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formTipoCuenta" className="mb-3">
                                            <Form.Label>Tipo de cuenta</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="tipoCuenta"
                                                value={formData.tipoCuenta}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccione el tipo de cuenta</option>
                                                <option value="Monetario">Monetario</option>
                                                <option value="Ahorro">Ahorro</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formMonto" className="mb-3">
                                            <Form.Label>Monto Inicial</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese el monto"
                                                name="monto"
                                                value={formData.monto}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formPreguntaSeguridad" className="mb-3">
                                            <Form.Label>Pregunta de seguridad</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su pregunta de seguridad"
                                                name="preguntaSeguridad"
                                                value={formData.preguntaSeguridad}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formRespuestaSeguridad" className="mb-3">
                                            <Form.Label>Respuesta de seguridad</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su respuesta"
                                                name="respuestaSeguridad"
                                                value={formData.respuestaSeguridad}
                                                onChange={handleChange}
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
                                    <Button variant="danger" onClick={handleCancel} block>
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
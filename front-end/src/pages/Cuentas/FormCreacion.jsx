import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Logo from '../../assets/logo.png';

export default function FormConsulta() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí manejarías el envío del formulario, incluyendo la encriptación de la respuesta de la pregunta de seguridad
        console.log(formData);
    };

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Solicitud de Nueva Cuenta</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formNombre">
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

                                <Form.Group controlId="formApellido">
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

                                <Form.Group controlId="formCui">
                                    <Form.Label>CUI</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su CUI"
                                        name="cui"
                                        value={formData.cui}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formTelefono">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Ingrese su teléfono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
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

                                <Form.Group controlId="formEdad">
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

                                <Form.Group controlId="formGenero">
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
                                        <option value="Otro">Otro</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formFotografia">
                                    <Form.Label>Fotografía</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="fotografia"
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formTipoCuenta">
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

                                <Form.Group controlId="formPreguntaSeguridad">
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

                                <Form.Group controlId="formRespuestaSeguridad">
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

                                <Form.Group controlId="formMonto">
                                    <Form.Label>Monto con el que abrirá su cuenta</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingrese el monto"
                                        name="monto"
                                        value={formData.monto}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid mt-4">
                                    <Button variant="primary" type="submit" block>
                                        Registrar Queja
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

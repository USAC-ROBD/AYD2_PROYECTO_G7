import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo.png';
import Swal from 'sweetalert2';

export default function FormCreacion() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cui: '',
        telefono: '',
        email: '',
        direccion: '',
        tipoCuenta: '',
        preguntaSeguridad: '',
        respuestaSeguridad: '',
        monto: '',
        existente: false,
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

    const handleLimpiar = () => {
        setFormData({
            nombre: '',
            apellido: '',
            cui: '',
            telefono: '',
            direccion: '',
            email: '',
            tipoCuenta: '',
            preguntaSeguridad: '',
            respuestaSeguridad: '',
            monto: '',
            existente: false,
        });
    };

    const handleCancelar = () => {
        handleLimpiar()
        navigate('/menu')
    }

    const handleOut = async (e) => {
        const { value } = e.target
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_cliente?cui=${value}`)
        if(response.ok) {
            const data = await response.json()
            console.log(data)
            setIsDisabled(data.encontrado)
            if(data.encontrado) {
                const { CUI, NOMBRE, APELLIDO, TELEFONO, EMAIL, DIRECCION, PREGUNTA, RESPUESTA } = data.cliente
                setFormData({
                    ...formData,
                    nombre: NOMBRE,
                    apellido: APELLIDO,
                    cui: CUI,
                    telefono: TELEFONO,
                    email: EMAIL,
                    direccion: DIRECCION,
                    preguntaSeguridad: PREGUNTA,
                    respuestaSeguridad: RESPUESTA,
                    existente: true,
                });
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "¿Confirmar envío?",
            text: "¡Por favor, verifica los datos antes de enviar la solicitud!",
            icon: "warning",
            showCancelButton: true, // Activa el botón de cancelar
            confirmButtonText: "Confirmar", // Texto del botón de confirmar
            cancelButtonText: "Cancelar",  // Texto del botón de cancelar
            dangerMode: true,
        });
    
        if (!result.isConfirmed) return;

        const response = await fetch(`${import.meta.env.VITE_API_HOST}/solicitar_crear_cuenta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: "¡Cuenta Creada!",
                showConfirmButton: false,
                timer: 2000,
            });

            handleCancelar()
            return;
        }

        handleLimpiar()

        Swal.fire({
            icon: 'error',
            title: "¡Error al crear la cuenta!",
            showConfirmButton: false,
            timer: 2000,
        });
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
                                        <Form.Group controlId="formCui" className="mb-3">
                                            <Form.Label>CUI</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese su CUI"
                                                name="cui"
                                                value={formData.cui}
                                                onChange={handleChange}
                                                onBlur={handleOut}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formNombre" className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                disabled={isDisabled}
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
                                                disabled={isDisabled}
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
                                                disabled={isDisabled}
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
                                                disabled={isDisabled}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formEmail" className="mb-3">
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su domicilio"
                                                name="direccion"
                                                value={formData.direccion}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formPreguntaSeguridad" className="mb-3">
                                            <Form.Label>Pregunta de seguridad</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su pregunta de seguridad"
                                                name="preguntaSeguridad"
                                                value={formData.preguntaSeguridad}
                                                onChange={handleChange}
                                                disabled={isDisabled}
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
                                                disabled={isDisabled}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
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
                                                <option value="M">Monetario</option>
                                                <option value="A">Ahorro</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formMonto" className="mb-3">
                                            <Form.Label>Monto Inicial (Q.)</Form.Label>
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
                                </Row>
                                <div className="d-grid mt-4">
                                    <Button variant="primary" type="submit" block>
                                        Finalizar Proceso
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
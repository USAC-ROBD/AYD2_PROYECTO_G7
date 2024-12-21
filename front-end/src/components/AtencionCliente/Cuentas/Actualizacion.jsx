import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo.png';
import Swal from 'sweetalert2';

export default function FormActualizarInfo() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_cliente_cui`);
                const data = await response.json();
                setClientes(data.clientes);
            } catch (error) {
                setClientes([])
            }
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        cui: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        email: '',
        preguntaSeguridad: '',
        respuestaSeguridad: '',
    });

    const [actuales, setActuales] = useState({
        telefono: '',
        direccion: '',
        email: '',
        preguntaSeguridad: '',
        respuestaSeguridad: '',
    })

    const handleChangeSelect = async (e) => {
        const { value } = e.target;
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_cliente?cui=${value}`);
        const data = await response.json();
        const { CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA } = data.cliente
        setActuales({
            telefono: TELEFONO,
            direccion: DIRECCION,
            email: EMAIL,
            preguntaSeguridad: PREGUNTA,
            respuestaSeguridad: RESPUESTA,
        })
        setFormData({
            cui: CUI,
            nombre: NOMBRE,
            apellido: APELLIDO,
            telefono: TELEFONO,
            direccion: DIRECCION,
            email: EMAIL,
            preguntaSeguridad: PREGUNTA,
            respuestaSeguridad: RESPUESTA,
        })
        setIsDisabled(false)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/actualizar_cliente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({formData, actuales}),
        });

        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: "¡Cliente Actualizado!",
                showConfirmButton: false,
                timer: 2000,
            });
            handleCancelar();
            return;
        }

        handleLimpiar();
        Swal.fire({
            icon: 'error',
            title: "¡Error al actualizar cliente!",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const handleLimpiar = () => {
        setFormData({
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            email: '',
            preguntaSeguridad: '',
            respuestaSeguridad: '',
        })
    }

    const handleCancelar = () => {
        handleLimpiar()
        navigate('/menu')
    }

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />
            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={10}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Actualización Cliente</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formCliente" className="mb-3">
                                            <Form.Label>Tipo de cuenta</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="cliente"
                                                value={formData.tipoCuenta}
                                                onChange={handleChangeSelect}
                                                required
                                            >
                                                <option value="">Seleccione un cliente</option>
                                                {clientes.length > 0 ? (
                                                    clientes.map((cliente, index) => (
                                                        <option key={index} value={cliente.CUI}>{cliente.CUI} - {cliente.NOMBRE}</option>
                                                    ))
                                                ) : (
                                                    <option value="">No hay datos disponibles</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formNombre" className="mb-3">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                disabled
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formApellido" className="mb-3">
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleChange}
                                                disabled
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
                                                name="respuestaSeguridad"
                                                value={formData.respuestaSeguridad}
                                                onChange={handleChange}
                                                disabled={isDisabled}
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
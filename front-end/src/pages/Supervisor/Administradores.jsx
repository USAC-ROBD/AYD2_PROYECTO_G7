import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';

function Administradores() {
    const administradores = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'jperez@example.com', telefono: '1234567890' },
        { id: 2, nombre: 'María', apellido: 'López', email: 'mlopez@example.com', telefono: '0987654321' },
        { id: 3, nombre: 'Carlos', apellido: 'Gómez', email: 'cgomez@example.com', telefono: '1122334455' },
    ];

    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [show, setShow] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [admin, setAdmin] = useState({nombre: '', apellido: '', telefono: '', email: '', edad: '', dpi: '', genero: 'M', estadoCivil: 'S', papeleria: '', foto: ''});

    const handleClose = () => setShow(false);
    const handleShow = (isNew) => {
        if (isNew) {
            setAdmin({nombre: '', apellido: '', telefono: '', email: '', edad: '', dpi: '', genero: 'M', estadoCivil: 'S', papeleria: '', foto: ''});
        }
        setIsNew(isNew);
        setShow(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setAdmin({ ...admin, [name]: files[0] });
        } else {
            setAdmin({ ...admin, [name]: value });
        }
    };

    const validateForm = () => {
        return admin.nombre && admin.apellido && admin.telefono && admin.email && admin.edad && admin.dpi && admin.genero && admin.estadoCivil && admin.papeleria && admin.foto;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Por favor, llene todos los campos');
            return;
        }

        if (isNew) {
            handleRegister();
        } else {
            handleUpdate();
        }

        handleClose();
    };

    const handleRegister = () => {
        console.log('Registrar', admin);
    };

    const handleUpdate = () => {
        console.log('Editar', admin);
    };

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es supervisor, redirigimos al menu principal
    if (rol !== 3) { // 3 es el ID del rol supervisor
        navigate('/menu');
    }

    return (
        <>
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>

                <Button size="lg" variant="primary" onClick={() => navigate('/menu')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    Inicio
                </Button>
                
                <img src={Logo} style={{ width: '65%' }} alt="logo" />
                <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%' }}>
                    <h1 className='me-3'>Administradores</h1>
                    <Button className='ms-3' variant='success' size='lg' onClick={() => handleShow(true)}>Registrar</Button>
                </Container>
                <Table className='mt-5' style={{ width: '80%' }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradores.map((empleado) => (
                            <tr key={empleado.id}>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.email}</td>
                                <td>{empleado.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isNew ? 'Registrar' : 'Editar'} Administrador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="nombre" value={admin.nombre} onChange={handleInputChange} placeholder="Ingrese el nombre" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" name="apellido" value={admin.apellido} onChange={handleInputChange} placeholder="Ingrese el apellido" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicTelefono">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" name="telefono" value={admin.telefono} onChange={handleInputChange} placeholder="Ingrese el teléfono" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={admin.email} onChange={handleInputChange} placeholder="Ingrese el email" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEdad">
                                    <Form.Label>Edad</Form.Label>
                                    <Form.Control type="number" name="edad" value={admin.edad} onChange={handleInputChange} placeholder="Ingrese la edad" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicDPI">
                                    <Form.Label>DPI</Form.Label>
                                    <Form.Control type="text" name="dpi" value={admin.dpi} onChange={handleInputChange} placeholder="Ingrese el DPI" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicGenero">
                                    <Form.Label>Género</Form.Label>
                                    <Form.Control as="select" name="genero" value={admin.genero} onChange={handleInputChange}>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEstadoCivil">
                                    <Form.Label>Estado Civil</Form.Label>
                                    <Form.Control as="select" name="estadoCivil" value={admin.estadoCivil} onChange={handleInputChange}>
                                        <option value="S">Soltero</option>
                                        <option value="C">Casado</option>
                                        <option value="D">Divorciado</option>
                                        <option value="V">Viudo</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPapeleria">
                                    <Form.Label>Papelería</Form.Label>
                                    <Form.Control type='file' accept='application/pdf' name="papeleria" onChange={handleInputChange} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicFoto">
                                    <Form.Label>Foto</Form.Label>
                                    <Form.Control type='file' accept='image/*' name="foto" onChange={handleInputChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="secondary" onClick={handleClose} className="me-3">
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {isNew ? 'Registrar' : 'Editar'}
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Administradores;

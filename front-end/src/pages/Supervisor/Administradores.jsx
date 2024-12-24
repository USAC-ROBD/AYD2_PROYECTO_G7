import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import DTable from '../../components/General/DTable';

function Administradores() {
    const [administradores, setAdministradores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [show, setShow] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [admin, setAdmin] = useState({nombre: '', apellido: '', telefono: '', correo: '', edad: '', cui: '', genero: 'M', estado_civil: 'S', papeleria: '', foto: ''});

    useEffect(() => {
        if (!user || !rol) {
            return;
        }

        // Si el rol no es supervisor, redirigimos al menu principal
        if (rol !== 3) { // 3 es el ID del rol supervisor
            navigate('/menu');
        } else {
            setIsLoading(false);
        }
    }, [user, rol, navigate]);

    useEffect(() => {
        if(!isLoading) {
            fetchData();
        }
    }, [isLoading]);


    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_administradores`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            setAdministradores(result.data);
        } catch (error) {
            setAdministradores([])
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = (isNew, admin) => {
        if (isNew) {
            setAdmin({nombre: '', apellido: '', telefono: '', correo: '', edad: '', cui: '', genero: 'M', estado_civil: 'S', papeleria: '', foto: ''});
        } else {
            setAdmin(admin);
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
        return admin.nombre && admin.apellido && admin.telefono && admin.correo && admin.edad && admin.cui && admin.genero && admin.estado_civil;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm() || (isNew && (!admin.papeleria || !admin.foto))) {
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

    const handleRegister = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre', admin.nombre);
            formData.append('apellido', admin.apellido);
            formData.append('telefono', admin.telefono);
            formData.append('correo', admin.correo);
            formData.append('edad', admin.edad);
            formData.append('cui', admin.cui);
            formData.append('genero', admin.genero);
            formData.append('estado_civil', admin.estado_civil);
            formData.append('papeleria', admin.papeleria, 'papeleria.pdf');
            formData.append('foto', admin.foto, 'foto.jpg');

            const response = await fetch(`${import.meta.env.VITE_API_HOST}/registrar_administrador`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const result = await response.json();
            alert(result.message);
            fetchData();
        } catch (error) {
            console.error('Error en handleRegister:', error);
            alert('Ocurrió un error al registrar el administrador');
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id_usuario', admin.id);
            formData.append('usuario', admin.usuario);
            formData.append('nombre', admin.nombre);
            formData.append('apellido', admin.apellido);
            formData.append('telefono', admin.telefono);
            formData.append('correo', admin.correo);
            formData.append('edad', admin.edad);
            formData.append('cui', admin.cui);
            formData.append('genero', admin.genero);
            formData.append('estado_civil', admin.estado_civil);
            admin.papeleria && admin.papeleria instanceof File ? formData.append('papeleria', admin.papeleria, 'papeleria.pdf') : null;
            admin.foto && admin.papeleria instanceof File ? formData.append('foto', admin.foto, 'foto.jpg') : null;
            
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/actualizar_administrador`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const result = await response.json();
            alert(result.message);
            fetchData();
        } catch (error) {
            console.error('Error en handleUpdate:', error);
            alert('Ocurrió un error al actualizar el administrador');
        }
    };

    const handleDelete = async () => {
        try {
            if (!window.confirm('¿Está seguro de eliminar el administrador?')) {
                return;
            }

            const formData = new FormData();
            formData.append('id_usuario', admin.id);
            formData.append('usuario', admin.usuario);

            const response = await fetch(`${import.meta.env.VITE_API_HOST}/eliminar_administrador`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const result = await response.json();
            alert(result.message);
            handleClose();
            fetchData();
        } catch (error) {
            console.error('Error en handleDelete:', error);
            alert('Ocurrió un error al eliminar el administrador');
        }
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
                <DTable 
                    columns={[
                        {name: 'Usuario', selector: row => row.usuario, sortable: true},
                        {name: 'CUI', selector: row => row.cui, sortable: true},
                        {name: 'Nombre', selector: row => `${row.nombre} ${row.apellido}`, sortable: true},
                        {name: 'Correo', selector: row => row.correo, sortable: true},
                        {name: 'Teléfono', selector: row => row.telefono, sortable: true},
                        {name: 'Estado', selector: row => {
                            switch (row.estado) { 
                                case 'P': return 'Pendiente'; 
                                case 'A': return 'Activo'; 
                                case 'I': return 'Inactivo'; 
                                case 'B': return 'Bloqueado'; 
                                default: return 'Desconocido';
                            }
                        }, sortable: true},
                        {name: 'Acciones', cell: row => <Button variant='primary' onClick={() => handleShow(false, row)}>Editar</Button>}
                    ]}
                    data={administradores}
                    onRowClicked={(row) => handleShow(false, row)}
                    expanded={true}
                />
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
                                <Form.Group className="mb-3" controlId="formBasicCorreo">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="correo" name="correo" value={admin.correo} onChange={handleInputChange} placeholder="Ingrese el correo" required />
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
                                <Form.Group className="mb-3" controlId="formBasicCUI">
                                    <Form.Label>CUI</Form.Label>
                                    <Form.Control type="text" name="cui" value={admin.cui} onChange={handleInputChange} placeholder="Ingrese el número de DPI" required />
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
                                    <Form.Control as="select" name="estado_civil" value={admin.estado_civil} onChange={handleInputChange}>
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
                                    <Form.Control type='file' accept='application/pdf' name="papeleria" onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicFoto">
                                    <Form.Label>Foto</Form.Label>
                                    <Form.Control type='file' accept='image/*' name="foto" onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="secondary" onClick={handleClose} className="me-3">
                                Cancelar
                            </Button>
                            {
                                isNew ? null : 
                                    <Button variant="danger" className="me-3" onClick={handleDelete}>
                                    Eliminar
                                    </Button>
                            }
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

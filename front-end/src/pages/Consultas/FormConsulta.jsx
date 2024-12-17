import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import Logo from '../../assets/logo.png';
import { useLocation, useNavigate } from "react-router-dom";
import Firma from '../../assets/Firma.png';
import jsPDF from 'jspdf';

export default function FormConsulta() {
    const [encontrado1, setEncontrado1] = useState(false)
    const [encontrado2, setEncontrado2] = useState(false)
    const [cuiNumCuenta, setCuiNumCuenta] = useState("");
    const [cui, setCui] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [historial, setHistorial] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [numCuenta, setNumCuenta] = useState('');
    const [numero, setNumero] = useState('');
    const [titular, setTitular] = useState('');
    const [saldo, setSaldo] = useState('');
    const [actualizacion, setActualizacion] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const query = location.state?.query;
    const user = location.state?.user;
    const [mensajeError, setMensajeError] = useState(query === 'Busqueda Cliente' ? '¡Sin información de cliente!' : '¡Sin información de cuenta!')

    useEffect(() => {
        if (!query) {
            navigate("/modulo-consultas", { state: { user } });
        }
    }, [query, navigate]);


    // Maneja los cambios en los inputs
    const handleChangeCuiNumCuenta = (e) => {
        setCuiNumCuenta(e.target.value);
    };

    // Maneja los cambios en los inputs
    const handleChangeNumCuenta = (e) => {
        setNumCuenta(e.target.value);
    };

    const handleGeneratePDF = (item) => {
        const doc = new jsPDF();
        const logoWidth = 100;
        const logoHeight = 25;

        // Agregar el logo
        doc.addImage(Logo, "PNG", 50, 10, logoWidth, logoHeight);

        // Título
        doc.setFontSize(18);
        doc.text(`Comprobante de ${item.operacion}`, 50, 40);

        // Información del Pago
        doc.setFontSize(12);
        doc.text(`Modalidad: ${item.modalidad === 'T' ? 'Transferencia' : 'Efectivo'}`, 10, 50);
        doc.text(`Monto: ${item.monto}`, 10, 60);
        doc.text(`Método de Pago: ${item.creacion}`, 10, 70);

        doc.text(`Encargado del Pago: Chino de la tienda`, 10, 150);
        

        // Firma
        doc.text("Firma:", 10, 160);
        doc.addImage(Firma, "PNG", 10, 165, 50, 20); // Ajusta las dimensiones según la firma

        // Guardar el PDF
        doc.save("comprobante_pago_servicios.pdf");
    };

    const handleConsultar1 = async (e) => {
        e.preventDefault();
        setEncontrado1(false)
        setEncontrado2(false)
        if(cuiNumCuenta !== '') {
            if(query === 'Busqueda Cliente') {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/buscarcuenta?numcuenta_cui=${cuiNumCuenta}`)
                if(response.ok) {
                    const data = await response.json()
                    if(data.message === 'cliente encontrado') {
                        setCuiNumCuenta('')
                        setEncontrado1(true)
                        const { cui, nombre, apellido, direccion, telefono, email, historial } = data.cliente
                        setCui(cui)
                        setNombre(nombre)
                        setApellido(apellido)
                        setDireccion(direccion)
                        setTelefono(telefono)
                        setEmail(email)
                        setHistorial(historial)
                        return
                    }
                    setEncontrado1(false)
                    setMensajeError('¡Cliente no encontrado!')
                    return
                }
                setEncontrado1(false)
                setMensajeError('¡Error al consultar cliente!')
                return
            }
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtenercuentas?cui=${cuiNumCuenta}`)
            if(response.ok) {
                const data = await response.json()
                if(data.message === 'cuentas encontradas') {
                    setEncontrado1(true)
                    setCuentas(data.cuentas)
                    return
                }
                setEncontrado1(false)
                setMensajeError('¡Cliente no encontrado!')
                return
            }
            setEncontrado1(false)
            setMensajeError('¡Error al consultar cliente!')
            return
        }
        setEncontrado1(false)
    }

    const handleConsultar2 = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/mostrarsaldo?numcuenta=${numCuenta}`)
        if(response.ok) {
            const data = await response.json()
            setCuiNumCuenta('')
            setCuentas([])
            setNumCuenta('')
            setEncontrado1(false)
            setEncontrado2(true)
            const { numero, titular, saldo, actualizacion } = data.cuenta
            setNumero(numero)
            setTitular(titular)
            setSaldo(saldo)
            setActualizacion(actualizacion)
            return
        }
        setEncontrado1(false)
        setEncontrado2(false)
        setMensajeError('¡Error al consultar cuenta!')
    }

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>{query}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>

                                <Row>
                                    <Col>
                                        {/* Código del servicio */}
                                        <Form.Group className="mb-3" controlId="serviceCode">
                                            <Form.Control
                                                type="text"
                                                placeholder={query === 'Busqueda Cliente' ? "Ingrese el número de cuenta o CUI del cliente" : "Ingrese CUI del cliente"}
                                                name="serviceCode"
                                                value={cuiNumCuenta}
                                                onChange={handleChangeCuiNumCuenta}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Botón de Enviar */}
                                        <div className="d-grid">
                                            <Button variant="success" type="button" onClick={handleConsultar1}>
                                                Consultar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {encontrado1 ? (
                                    query === 'Busqueda Cliente' ? (
                                        <>
                                            {/* Información del cliente */}
                                            <Card className="mb-3">
                                                <Card.Header className="bg-secondary text-white text-center">
                                                    <h5>Información del Cliente</h5>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col><strong>CUI:</strong> {cui}</Col>
                                                        <Col><strong>Nombre:</strong> {nombre} {apellido}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col><strong>Dirección:</strong> {direccion}</Col>
                                                        <Col><strong>Teléfono:</strong> {telefono}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col><strong>Email:</strong> {email}</Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                            {/* Tabla del historial */}
                                            <Card>
                                                <Card.Header className="bg-secondary text-white text-center">
                                                    <h5>Historial de Transacciones</h5>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>Operacion</th>
                                                                <th>Modalidad</th>
                                                                <th>Monto</th>
                                                                <th>Fecha</th>
                                                                <th>Comprobante</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {historial.length > 0 ? (
                                                                historial.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{item.operacion}</td>
                                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{item.modalidad === 'T' ? 'Transferencia' : 'Efectivo'}</td>
                                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{item.monto}</td>
                                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{item.creacion}</td>
                                                                        <td>
                                                                            <Button
                                                                                variant="primary"
                                                                                onClick={() => handleGeneratePDF(item)}
                                                                            >
                                                                                Generar
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="5" className="text-center">
                                                                        No hay transacciones registradas.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </>
                                    ) : (
                                        <Row>
                                            <Col>
                                                {/* Código del servicio */}
                                                <Form.Group className="mb-3" controlId="serviceCode">
                                                    <Form.Select 
                                                        name="serviceType" 
                                                        aria-label="Seleccionar cuenta" 
                                                        defaultValue={numCuenta}
                                                        onChange={handleChangeNumCuenta}
                                                        required
                                                    >
                                                        <option value="" disabled>Seleccionar tipo de servicio</option>
                                                        {cuentas.map((opcion, index) => (
                                                            <option key={index} value={opcion}>
                                                                {opcion}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                {/* Botón de Enviar */}
                                                <div className="d-grid">
                                                    <Button variant="success" type="button" onClick={handleConsultar2}>
                                                        Consultar
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                ) : (
                                    !encontrado2 && (
                                    <div className="text-center mt-3" style={{ color: 'lightgray' }}>
                                        <h5>{mensajeError}</h5>
                                    </div>)
                                )}

                                {encontrado2 && (
                                    <>
                                        {/* Información de la cuenta */}
                                        <Card className="mb-3">
                                            <Card.Header className="bg-secondary text-white text-center">
                                                <h5>Saldo de la Cuenta</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col><strong>No.:</strong> {numero}</Col>
                                                    <Col><strong>Titular:</strong> {titular}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><strong>Saldo:</strong> {saldo}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><strong>Última Actualización:</strong> {actualizacion}</Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </>
                                )}

                                {/* Botón de Cancelar */}
                                <div className="d-grid mt-4">
                                    <Button variant="danger"
                                        type="button"
                                        onClick={() => navigate('/modulo-consultas', { state: { user } })}
                                    >
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
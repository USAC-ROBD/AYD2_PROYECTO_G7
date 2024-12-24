import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import useAuth from '../../hook/useAuth';
import DTable from '../../components/General/DTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GestionInventario() {
    const navigate = useNavigate();
    const { user, rol } = useAuth(); // Usamos el hook personalizado para obtener el usuario y rol
    const [isLoading, setIsLoading] = useState(true);
    
    const [actividades, setActividades] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [disponibilidadDia, setDisponibilidadDia] = useState([]);
    const [filtros, setFiltros] = useState({ empleado: '', fecha: '', tipo: '' });

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
            const intervalId = setInterval(() => {
                fetchData();
            }, 3000); // Cada 30 segundos

            return () => clearInterval(intervalId);
        }
    }, [isLoading]);

    useEffect(() => {
        if (!user || !rol) {
            return;
        }
        setTipos(new Set(actividades.map((actividad) => actividad.tipo)));
    }, [actividades]);


    const fetchData = async () => {
        try {
            const response_movimientos = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_movimientos`, {
                method: 'GET',
                credentials: 'include',
            });
            const result_movimientos = await response_movimientos.json();
            if (result_movimientos.status === 200) {
                setActividades(result_movimientos.data);
            } else {
                setActividades([]);
            }

            const response_disponibilidad = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_disponibilidad`, {
                method: 'GET',
                credentials: 'include',
            });
            const result_disponibilidad = await response_disponibilidad.json();
            if (result_disponibilidad.status === 200) {
                setDisponibilidad(result_disponibilidad.data);
            } else {
                setDisponibilidad([]);
            }

            const response_disponibilidad_dia = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_disponibilidad_dia`, {
                method: 'GET',
                credentials: 'include',
            });
            const result_disponibilidad_dia = await response_disponibilidad_dia.json();
            if (result_disponibilidad_dia.status === 200) {
                setDisponibilidadDia(result_disponibilidad_dia.data);
            } else {
                setDisponibilidadDia([]);
            }
        } catch (error) {
            console.error('Error en obtener_actividades:', error);
            setActividades([]);
            setDisponibilidad([]);
            setDisponibilidadDia([]);
        }
    };

    // Filtrar actividades
    const actividadesFiltradas = actividades.filter((actividad) => {
        return (
            (!filtros.empleado || actividad.empleado.toLowerCase().includes(filtros.empleado.toLowerCase())) &&
            (!filtros.fecha || actividad.fecha.includes(filtros.fecha)) &&
            (!filtros.tipo || actividad.tipo.toLowerCase().includes(filtros.tipo.toLowerCase()))
        );
    });

    if (!user || !rol) {
        return <div>Loading...</div>; // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es supervisor, redirigimos al menú principal
    if (rol !== 3) { // 3 es el ID del rol supervisor
        navigate('/menu');
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const pad = (num) => String(num).padStart(2, '0'); // Rellena con ceros hasta 2 dígitos
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    const getMonto = (moneda) => {
        const monedaData = disponibilidad.find(item => item.moneda === moneda);
        return monedaData ? monedaData.monto : 0;
    }

    const formatDisponibilidadDia = () => {
        return disponibilidadDia
            .sort((a, b) => new Date(a.dia) - new Date(b.dia))
            .map(item => ({
                dia: item.dia,
                dolares: item.dolares,
                quetzales: item.quetzales,
            }));
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>

            <Button size="lg" variant="primary" onClick={() => navigate('/menu')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                Inicio
            </Button>

            <Row className="mt-4">
                <Col md={12} className="text-center">
                    <h1>Gestión de Inventarios Bancarios</h1>
                </Col>
            </Row>

            <Row className='mt-4' style={{ width: '100%', justifyContent: 'center' }}>
                <h2 className="text-center mt-3">Disponibilidad</h2>
                <Col md={4} className="text-center">
                    <Card bg="primary" text="white">
                        <Card.Body>
                            <Card.Title>Dólares</Card.Title>
                            <Card.Text>{getMonto('Dolares')} USD</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="text-center">
                    <Card bg="success" text="white">
                        <Card.Body>
                            <Card.Title>Quetzales</Card.Title>
                            <Card.Text>{getMonto('Quetzales')} GTQ</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mt-4' style={{ width: '100%', justifyContent: 'center' }}>
                <h2 className="text-center mt-3">Ganancias y Pérdidas</h2>
                <Col md={12} className="text-center">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={formatDisponibilidadDia()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dia" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="dolares" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="quetzales" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>

            <Row className="mt-5">
                <h2 className="text-center mt-3">Movimientos</h2>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Filtrar por empleado"
                        value={filtros.empleado}
                        onChange={(e) => setFiltros({ ...filtros, empleado: e.target.value })}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="date"
                        value={filtros.fecha}
                        onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        as="select"
                        value={filtros.tipo}
                        onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                    >
                        <option value="">Filtrar por tipo</option>
                        {[...tipos].map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Button variant="secondary" onClick={() => setFiltros({ empleado: '', fecha: '', tipo: '' })}>
                        Limpiar Filtros
                    </Button>
                </Col>
            </Row>

            <Row className="mt-2" style={{ width: '100%' }}>
                <Col>
                    {
                        actividadesFiltradas.length > 0 ? (
                            <DTable
                                columns={[
                                    { name: 'Fecha', selector: row => formatDate(row.fecha), sortable: true, width: '200px' },
                                    { name: 'Movimientos', selector: row => row.movimiento, sortable: true, width: '600px' },
                                    { name: 'Empleado', selector: row => row.empleado, sortable: true, width: '200px' },
                                    { name: 'Monto', selector: row => row.monto, sortable: true, width: '200px' },
                                    { name: 'Tipo', selector: row => row.tipo, sortable: true, width: '200px' },
                                ]}
                                data={actividadesFiltradas}
                                expanded={true}
                                rowsPerPage={5}
                            />
                        ) : (
                            <h3 className="text-center mt-3">Buscando movimientos...</h3>
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default GestionInventario;

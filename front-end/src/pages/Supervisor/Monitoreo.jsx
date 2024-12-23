import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import DTable from '../../components/General/DTable';

function Monitoreo() {
    const navigate = useNavigate();
    const { user, rol } = useAuth(); // Usamos el hook personalizado para obtener el usuario y rol
    const [actividades, setActividades] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_actividades`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            if (result.status === 200) {
                setActividades(result.data);
            } else {
                setActividades([]);
            }
        } catch (error) {
            console.error('Error en obtener_actividades:', error);
            setActividades([]);
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

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>

            <Button size="lg" variant="primary" onClick={() => navigate('/menu')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                Inicio
            </Button>

            <Row className="mt-4">
                <Col md={12} className="text-center">
                    <h1>Monitoreo en Tiempo Real</h1>
                </Col>
            </Row>

            <Row className="mt-3">
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
                    <DTable
                        columns={[
                            { name: 'Fecha', selector: row => formatDate(row.fecha), sortable: true, width: '200px' },
                            { name: 'Empleado', selector: row => row.empleado, sortable: true, width: '200px' },
                            { name: 'Actividad', selector: row => row.actividad, sortable: true, width: '800px' },
                            { name: 'Tipo', selector: row => row.tipo, sortable: true, width: '200px' },
                        ]}
                        data={actividadesFiltradas}
                        expanded={true}
                        rowsPerPage={8}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Monitoreo;
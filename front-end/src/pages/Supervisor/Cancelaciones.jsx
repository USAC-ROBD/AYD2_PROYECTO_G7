import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Button} from 'react-bootstrap';
import DTable from '../../components/General/DTable';
import Swal from 'sweetalert2';

function Cancelaciones() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol

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
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/solicitudes_cancelacion`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            setSolicitudes(result.data);
        } catch (error) {
            setSolicitudes([])
        }
    };

    const handleAceptar = async (id, servicio) => {
        Swal.fire({
            title: 'Aceptar solicitud',
            text: '¿Está seguro que desea aceptar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }

            let tipo = '';
            if (servicio === 'Tarjeta') {
                tipo = 'T';
            } else if (servicio === 'Cuenta') {
                tipo = 'C';
            } else {
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/aceptar_cancelacion`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, tipo }),
                });
                const result = await response.json();
                if (result.status === 200) {
                    Swal.fire({
                        title: 'Solicitud aceptada',
                        icon: 'success',
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: result.message,
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al aceptar la solicitud',
                    icon: 'error',
                });
            }
        });
    };

    const handleRechazar = async (id) => {
        Swal.fire({
            title: 'Rechazar solicitud',
            text: '¿Está seguro que desea rechazar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/rechazar_cancelacion`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                const result = await response.json();
                if (result.status === 200) {
                    Swal.fire({
                        title: 'Solicitud rechazada',
                        icon: 'success',
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: result.message,
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al rechazar la solicitud',
                    icon: 'error',
                });
            }
        });
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    if (isLoading) {
        return (
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
                <h1>Cargando...</h1>
            </Container>
        );
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>

            <Button size="lg" variant="primary" onClick={() => navigate('/menu')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                Inicio
            </Button>

            <img src={Logo} style={{ width: '65%' }} alt="logo" />
            <h1>Solicitudes de Cancelación de Productos</h1>
            <DTable
                columns={[
                    { name: 'CUI', selector: row => row.cui, sortable: true, width: '125px' },
                    { name: 'Cliente', selector: row => row.cliente, sortable: true, width: '200px' },
                    { name: 'Servicio', selector: row => row.servicio, sortable: true, width: '90px' },
                    { name: 'Número', selector: row => row.numero, sortable: true, width: '140px' },
                    { name: 'Motivo', selector: row => row.motivo, sortable: true, width: '500px' },
                    { name: 'Fecha', selector: row => formatDate(row.creado), sortable: true, width: '100px' },
                    { name: 'Usuario', selector: row => row.crea, sortable: true, width: '100px' },
                    //Acciones (aceptar, cancelar) botones pequeños
                    { name: 'Acción', cell: row => <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button className='me-1' variant="success" size="sm" onClick={() => {
                            handleAceptar(row.id, row.servicio);
                        }}>Aceptar</Button>
                        <Button className='ms-1' variant="danger" size="sm" onClick={() => {
                            handleRechazar(row.id);
                        }}>Rechazar</Button>
                    </div>, width: '200px' },
                ]}
                data={solicitudes}
                expanded={true}
                rowsPerPage={5}
            />
        </Container>
    );
}

export default Cancelaciones;

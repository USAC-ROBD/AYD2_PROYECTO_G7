import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Button} from 'react-bootstrap';
import DTable from '../../components/General/DTable';

function Quejas() {
    const [quejas, setQuejas] = useState([]);
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
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_quejas`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                setQuejas(result.data);
            } catch (error) {
                setQuejas([])
            }
        };

        if(!isLoading) {
            fetchData();
        }
    }, [isLoading]);

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
            <h1>Quejas</h1>
            <DTable
                columns={[
                    { name: 'ID', selector: row => row.id, sortable: true, width: '80px' },
                    { name: 'CUI', selector: row => row.cui, sortable: true, width: '200px' },
                    { name: 'Cliente', selector: row => row.cliente, sortable: true, width: '300px' },
                    { name: 'Categoría', selector: row => row.categoria, sortable: true, width: '200px' },
                    { name: 'Descripción', selector: row => row.descripcion, sortable: true, width: '500px' },
                    { name: 'Fecha', selector: row => formatDate(row.creado), sortable: true },
                ]}
                data={quejas}
                expanded={true}
            />
        </Container>
    );
}

export default Quejas;

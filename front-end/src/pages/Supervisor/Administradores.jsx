import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Table, Button, Alert} from 'react-bootstrap';

function Administradores() {
    const administradores = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'jperez@example.com', telefono: '1234567890' },
        { id: 2, nombre: 'María', apellido: 'López', email: 'mlopez@example.com', telefono: '0987654321' },
        { id: 3, nombre: 'Carlos', apellido: 'Gómez', email: 'cgomez@example.com', telefono: '1122334455' },
    ];

    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es supervisor, redirigimos al menu principal
    if (rol !== 3) { // 3 es el ID del rol supervisor
        navigate('/menu');
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>

            <Button size="lg" variant="primary" onClick={() => navigate('/menu')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                Inicio
            </Button>

            <img src={Logo} style={{ width: '65%' }} alt="logo" />
            <h1>Administradores</h1>
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
    );
}

export default Administradores;

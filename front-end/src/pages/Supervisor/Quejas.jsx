import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Table, Button} from 'react-bootstrap';

function Quejas() {
    const quejas = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', servicio: 'Préstamo', queja: 'No me dieron el monto solicitado' },
        { id: 2, nombre: 'María', apellido: 'López', servicio: 'Tarjeta de crédito', queja: 'Cobro de comisión no autorizado' },
        { id: 3, nombre: 'Carlos', apellido: 'Gómez', servicio: 'Cuenta de ahorros', queja: 'No se refleja el depósito' },
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
            <h1>Quejas</h1>
            <Table className='mt-5' style={{ width: '80%' }} striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Servicio</th>
                        <th>Queja</th>
                    </tr>
                </thead>
                <tbody>
                    {quejas.map((queja) => (
                        <tr key={queja.id}>
                            <td>{queja.id}</td>
                            <td>{queja.nombre}</td>
                            <td>{queja.apellido}</td>
                            <td>{queja.servicio}</td>
                            <td>{queja.queja}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Quejas;

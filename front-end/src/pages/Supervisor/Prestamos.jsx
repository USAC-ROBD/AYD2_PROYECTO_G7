import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Button, Card, Form, } from 'react-bootstrap';


function Prestamos() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [solicitudesPrestamos, setSolicitudesPrestamos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(""); // Estado de error

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_prestamos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setSolicitudesPrestamos(result.data)
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
                setError("No se pudo conectar al servidor.");
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchData(); // Llama a la función al montar el componente
    }, []);

    if (!user || !rol) {
        return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
    }

    // Si el rol no es supervisor, redirigimos al menu principal
    if (rol !== 3) { // 3 es el ID del rol supervisor
        navigate('/menu');
    }

    if (loading) {
        return <div>Cargando...</div>; // Muestra un indicador de carga mientras se obtienen los datos
    }

    if (error) {
        return <div>Error: {error}</div>; // Muestra un mensaje de error si ocurre un problema
    }

     // Maneja el envío del formulario
  const handleSubmitA = async (id_solicitud, estado) => { // Corrección: Recibe id_usuario como argumento
    const data = { id_solicitud,estado};
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/actualizar_prestamo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const errorData = await response.json();
  
      if (response.ok) {
        alert("Solicitud de prestamo actualizada");
        navigate("/menu");
      } else if (response.status === 404) {
        alert(`Error: ${errorData.message}`);
      } else if (response.status === 422) {
        alert(`Error: ${errorData.message}`);
      } else if (response.status === 500) {
        alert(`Error: ${errorData.message}`);
      } else {
        alert("Hubo un error al aprobar el prestamo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar al servidor");
    }
}

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Card style={{ width: "80%" }}>
                <Card.Header className="bg-primary text-white text-center">
                    <h4> Prestamos </h4>
                </Card.Header>
                <Card.Body>
                    <Form >
                        <div>
                            <div className="d-flex justify-content-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">CUI</th>
                                            <th scope="col">Tipo de Prestamo</th>
                                            <th scope="col">Monto</th>
                                            <th scope="col">Plazo</th>
                                            <th scope="col">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {solicitudesPrestamos.map((solicitud, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{solicitud.CUI}</td>
                                                <td>{solicitud.TIPO_PRESTAMO}</td>
                                                <td>{solicitud.MONTO}</td>
                                                <td>{solicitud.PLAZO}</td>
                                                <td>
                                                    <button className="btn btn-success m-1" type="button" onClick={() => handleSubmitA(solicitud.ID_SOLICITUD,'A')} id={'aprobacion-' + solicitud.ID_SOLICITUD}> Aprobar
                                                    </button>

                                                    <button className="btn btn-danger m-1" type="button" onClick={() => handleSubmitR(solicitud.ID_SOLICITUD,'R')} id={'rechazo-' + solicitud.ID_SOLICITUD}> Rechazar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Botón de Cancelar */}
                        <div className="d-grid m-1">
                            <Button variant="danger"
                                type="button"
                                onClick={() => navigate('/menu')}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default Prestamos;

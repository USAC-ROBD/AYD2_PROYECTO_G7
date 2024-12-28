import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Logo from '../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { Container, Button, Card, Form,} from 'react-bootstrap';

function Encuestas() {
    const navigate = useNavigate();
    const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol
    const [encuestas, setEncuetas] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(""); // Estado de error

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/obtener_encuetas`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (response.ok) {
              const result = await response.json();
              setEncuetas(result.data)
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

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
              <img src={Logo} style={{ width: '65%' }} alt="logo" />
        
              <Card style={{ width: "80%" }}>
                <Card.Header className="bg-primary text-white text-center">
                  <h4> Encuestas </h4>
                </Card.Header>
                <Card.Body>
                  <Form >
                    <div>
                      <div className="d-flex justify-content-center">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Nombre</th>
                              <th scope="col">Apellido</th>
                              <th scope="col">CUI</th>
                              <th scope="col">Categoria</th>
                              <th scope="col">Calificacion</th>
                              <th scope="col">Comentario</th>
                            </tr>
                          </thead>
                          <tbody>
                            {encuestas.map((encuesta, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{encuesta.NOMBRE}</td>
                                <td>{encuesta.APELLIDO}</td>
                                <td>{encuesta.CUI}</td>
                                <td>{encuesta.CATEGORIA}</td>
                                <td>{encuesta.CALIFICACION}</td>
                                <td>{encuesta.COMENTARIO}</td>
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

export default Encuestas;

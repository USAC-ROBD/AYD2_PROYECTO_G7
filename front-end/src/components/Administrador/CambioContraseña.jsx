import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Logo from '../../assets/logo.png';
import { MdOutlinePassword } from "react-icons/md";

function CambioContraseña() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/empleado`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.data)
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
  }, []); // Se ejecuta solo al cargar el componente

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se obtienen los datos
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra un mensaje de error si ocurre un problema
  }


  // Maneja el envío del formulario
  const handleSubmit = async (id_usuario) => { // Corrección: Recibe id_usuario como argumento
    const data = { id_usuario };


    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/cambiar-contrasena`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const errorData = await response.json();

      if (response.ok) {
        alert("Creacion de contraseña nueva para el usuario");
        navigate("/menu");
      } else if (response.status === 404) {
        alert(`Error: ${errorData.message}`);
      } else if (response.status === 422) {
        alert(`Error: ${errorData.message}`);
      } else if (response.status === 500) {
        alert(`Error: ${errorData.message}`);
      } else {
        alert("Hubo un error al tratar de generar una nueva contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar al servidor");
    }
  };

  return (
    <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%' }} alt="logo" />

      <Card style={{ width: "80%" }}>
        <Card.Header className="bg-primary text-white text-center">
          <h4> Restablece la contraseña </h4>
        </Card.Header>
        <Card.Body>
          <Form >
            <div>
              <div className="d-flex justify-content-center">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Usuario</th>
                      <th scope="col">Rol</th>
                      <th scope="col">Nueva Contraseña</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((empleado, index) => (
                      <tr key={empleado.ID || index}>
                        <th scope="row">{index + 1}</th>
                        <td>{empleado.NOMBRE}</td>
                        <td>{empleado.APELLIDO}</td>
                        <td>{empleado.USUARIO}</td>
                        <td>{empleado.ROL}</td>
                        <td className="d-flex justify-content-start">
                          <button className="btn btn-success" type="button" onClick={() => handleSubmit(empleado.ID_USUARIO)} id={'usuario-' + empleado.ID_USUARIO}>
                            <MdOutlinePassword />
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

export default CambioContraseña;

import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Logo from '../../assets/logo.png';

function AsignacionRol() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [id_usuario, setID_Usuario] = useState('')
  const [user_Rol, setUser_Rol] = useState('');
  const [new_Rol, setNew_Rol] = useState('');
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

  const rol_actual = (rol) => {
    const only_rol = rol.split(",")
    setID_Usuario(only_rol[0])
    setUser_Rol(only_rol[1])
  }


    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
        id_usuario,
        rol:new_Rol
      };

      console.log(data)
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/rol-empleado-actualizar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const errorData = await response.json();
  
        if (response.ok) {
          alert("Rol del usuario actualizado correctamente");
          navigate("/menu");
        } else if (response.status === 404) {
          alert(`Error: ${errorData.message}`);
        } else if (response.status === 422) {
          alert(`Error: ${errorData.message}`);
        } else if (response.status === 500) {
          alert(`Error: ${errorData.message}`);
        } else {
          alert("Hubo un error al realizar el registro");
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
          <h4> Rol de empleado </h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Usuario Empleado</label>
                  <select name="" id="" className="form-select" aria-label="Default select example"
                    onChange={(e) => rol_actual(e.target.value)}>
                    <option value="0">Seleccione un empleado</option>
                    {user.map((empleado) => (
                      <option key={empleado.ID_USUARIO} value={empleado.ID_USUARIO + ',' + empleado.ROL}>
                        {empleado.USUARIO}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Rol actual</label>
                  <input type="text" className="form-control" value={user_Rol} disabled />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Nuevo Rol</label>
                  <select name="" id="" className="form-select" aria-label="Default select example"
                  onChange={(e) => setNew_Rol(e.target.value)}>
                    <option value="0">Seleccione un rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Cajero</option>
                    <option value="3">Supervisor</option>
                    <option value="4">Agente Servicio al Cliente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botón de Depositar */}
            <div className="d-grid m-1">
              <Button variant="success"
                type="submit"
              >
                Guardar
              </Button>
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

export default AsignacionRol;

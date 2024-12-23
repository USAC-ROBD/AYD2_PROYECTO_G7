import { Container, Card, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';

function RegistroEmpleado() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dpi, setDPI] = useState("");
  const [correo, setCorreo] = useState("");
  const [papeleria, setPapeleria] = useState("");
  const [fotografia, setFotografia] = useState("");
  const [estado_civil, setEstadoCivil] = useState("");
  const [genero, setGenero] = useState("");
  const [rol, setRol] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { nombre, apellido, edad, telefono, dpi, rol, correo, papeleria, fotografia, genero, estado_civil } = req.body;

    const data = {
      nombre,
      apellido,
      edad,
      telefono,
      dpi,
      rol,
      correo,
      papeleria,
      fotografia,
      genero,
      estado_civil
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/registrar-usuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const errorData = await response.json();

      if (response.ok) {
        alert("Usuario registrado con exito");
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
          <h4>Registro de empleado </h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Nombre</label>
                  <input type="text"
                    className="form-control"
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Apellido</label>
                  <input type="text"
                    className="form-control"
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Edad</label>
                  <input type="text"
                    className="form-control"
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder=""
                    required />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Número de teléfono</label>
                  <input type="text"
                    className="form-control"
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Numero de DPI</label>
                  <input type="text"
                    className="form-control"
                    onChange={(e) => setDPI(e.target.value)}
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Correo electrónico</label>
                  <input type="text"
                    className="form-control"
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder=""
                    required />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-5 m-4">
                  <label htmlFor="" className="form-label">Papelería completa (PDF)</label>
                  <input className="form-control" type="file" id="formFile" onChange={(e) => setPapeleria(e.target.value)}></input>
                </div>
                <div className="col-5 m-4">
                  <label htmlFor="" className="form-label">Fotografía</label>
                  <input class="form-control" type="file" id="formFile" onChange={(e) => setFotografia(e.target.value)}></input>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Estado Civil</label>
                  <select name="" id="" className="form-select" aria-label="Default select example" onChange={(e) => setEstadoCivil(e.target.value)}>
                    <option value="S">Soltero</option>
                    <option value="C">Casado</option>
                    <option value="D">Divorciado</option>
                    <option value="V">Viudo</option>
                  </select>
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Genero</label>
                  <select name="" id="" className="form-select" aria-label="Default select example" onChange={(e) => setGenero(e.target.value)}>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Rol</label>
                  <select name="" id="" className="form-select" aria-label="Default select example" onChange={(e) => setRol(e.target.value)}>
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
                Registrar
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

export default RegistroEmpleado;

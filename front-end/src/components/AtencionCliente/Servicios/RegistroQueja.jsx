import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function RegistroQueja({ handleRegistroQueja, user }) {
  const [cui, setCui] = useState("");
  const [cliente, setCliente] = useState("");
  const [queja, setQueja] = useState("");
  const [categoria, setCategoria] = useState("");

  const navigate = useNavigate();

  const handleVerificarCui = async () => {
    if (cui === "") {
      Swal.fire({
        title: "Error",
        text: "Ingrese un CUI válido",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    console.log("value: " + cui);
    const response = await fetch(
      `${import.meta.env.VITE_API_HOST}/obtener_cliente?cui=${cui}`
    );
    const data = await response.json();
    if (data.encontrado == true) {
      console.log("se encontró");
      setCliente(data.cliente.NOMBRE + " " + data.cliente.APELLIDO);
      console.log(cliente);
    } else {
      Swal.fire({
        title: "Error",
        text: "Cliente no encontrado",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      cui,
      categoria,
      descripcion: queja,
      crea: user,
    };

    try {
      fetch(`${import.meta.env.VITE_API_HOST}/registro_queja`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            Swal.fire({
              title: "Solicitud generada con éxito",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
            handleRegistroQueja(
              (data = {
                cui,
                categoria,
                descripcion: queja,
                crea: user,
              })
            );
          } else {
            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al generar la solicitud",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Row
      className="justify-content-center"
      style={{ width: "100%", paddingLeft: "15%", paddingRight: "15%" }}
    >
      <Col md={8}>
        <Card>
          <Card.Header className="bg-primary text-white text-center">
            <h4>Registro de quejas</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <label htmlFor="" className="form-label">
                  CUI
                </label>
                <Col xs={6} md={6}>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="xxxxxxx"
                    value={cui}
                    onChange={(e) => setCui(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={6} md={4} style={{ width: "50%" }}>
                  <Button
                    variant="primary"
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleVerificarCui}
                  >
                    Verificar
                  </Button>
                </Col>
              </Row>

              {/* Datos de la cuenta */}

              {cliente != "" && (
                <Row>
                  <Col className="m-1" xs={12}>
                    <label htmlFor="" className="form-label">
                      Cliente
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Propietario de cuenta"
                      value={cliente}
                      readOnly
                      required
                    />
                  </Col>

                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Tipo de servicio
                    </label>

                    <Form.Control
                      as="select"
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                    >
                      <option value="">Seleccione...</option>
                      <option value="A">Atención al cliente</option>
                      <option value="P">Productos</option>
                      <option value="S">Servicios</option>
                    </Form.Control>
                  </div>

                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Descripción
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Descripción de la queja"
                      value={queja}
                      onChange={(e) => setQueja(e.target.value)}
                      required
                    />
                  </div>
                  {/* Botón de Crear */}
                  <div className="d-grid mt-3">
                    <Button variant="success" type="submit">
                      Registrar queja
                    </Button>
                  </div>
                </Row>
              )}

              {/* Botón de Cancelar */}
              <div className="d-grid mt-3">
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => navigate("/menu")}
                >
                  Regresar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RegistroQueja;

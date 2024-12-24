import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CancelacionServicio({ handleCancelacionServicio, user }) {
  const [tipoServicio, setTipoServicio] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [motivoCancelacion, setMotivoCancelacion] = useState("");
  const [idCuenta, setIdCuenta] = useState("");
  const [cui, setCui] = useState("");

  const [destinoCuenta, setDestinoCuenta] = useState("");
  const [montoDepositar, setMontoDepositar] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [moneda, setMoneda] = useState("");
  const [monedas, setMonedas] = useState(["GTQ", "USD"]);
  const [propietario, setPropietario] = useState("");
  const [monedaSeleccionada, setMonedaSeleccionada] = useState("");
  const navigate = useNavigate();

  const handleTipoServicio = async () => {
    if (tipoServicio === "") {
      Swal.fire({
        title: "Error",
        text: "Seleccione el tipo de servicio",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    if (numeroCuenta === "") {
      Swal.fire({
        title: "Error",
        text: "Ingrese el número de " + tipoServicio,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    let data = {
      cuenta: numeroCuenta,
    };
    if (tipoServicio === "cuenta") {
      try {
        fetch(`${import.meta.env.VITE_API_HOST}/consultar_datos_cuenta`, {
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
              setPropietario(data.data.nombre);
              setIdCuenta(data.data.id_cuenta);
              setCui(data.data.cui);
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
          text: "Ocurrió un error al verificar la cuenta",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      try {
        fetch(`${import.meta.env.VITE_API_HOST}/consultar_datos_tarjeta`, {
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
              setPropietario(data.data.nombre);
              setIdCuenta(data.data.id_cuenta);
              setCui(data.data.cui);
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
          text: "Ocurrió un error al verificar la tarjeta",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const handleChangeSelect = async (e) => {
    setTipoServicio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      tipo_servicio: tipoServicio,
      idCuenta,
      cui,
      descripcion: motivoCancelacion,
      crea: user,
    };

    try {
      fetch(`${import.meta.env.VITE_API_HOST}/solicitud_cancelacion`, {
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
            handleCancelacionServicio(
              (data = {
                tipo_servicio: tipoServicio,
                idCuenta,
                cui,
                descripcion: motivoCancelacion,
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
            <h4>Cancelación de servicios</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <label htmlFor="" className="form-label">
                  Tipo de servicio
                </label>
                <Col xs={6} md={6}>
                  <Form.Control
                    as="select"
                    name="tipoServicio"
                    value={tipoServicio}
                    onChange={handleChangeSelect}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="cuenta">Cuenta</option>
                    <option value="tarjeta">Tarjeta</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <label htmlFor="" className="form-label">
                  Número
                </label>
                <Col xs={6} md={6}>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="xxxxxxx"
                    value={numeroCuenta}
                    onChange={(e) => setNumeroCuenta(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={6} md={4} style={{ width: "50%" }}>
                  <Button
                    variant="primary"
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleTipoServicio}
                  >
                    Verificar
                  </Button>
                </Col>
              </Row>

              {/* Datos de la cuenta */}

              {propietario != "" && (
                <Row>
                  <Col className="m-1" xs={12}>
                    <label htmlFor="" className="form-label">
                      Propietario de Cuenta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Propietario de cuenta"
                      value={propietario}
                      readOnly
                      required
                    />
                  </Col>

                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Motivo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Motivo de cancelación"
                      value={motivoCancelacion}
                      onChange={(e) => setMotivoCancelacion(e.target.value)}
                      required
                    />
                  </div>
                  {/* Botón de Depositar */}
                  <div className="d-grid mt-3">
                    <Button variant="success" type="submit">
                      Cancelar servicio
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

export default CancelacionServicio;

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FormDeposito({ handleConfirmacionDeposito, user }) {
    const [destinoCuenta, setDestinoCuenta] = useState("");
    const [montoDepositar, setMontoDepositar] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [moneda, setMoneda] = useState("");
    const [monedas, setMonedas] = useState(["GTQ", "USD"]);
    const [propietario, setPropietario] = useState("");
    const [monedaSeleccionada, setMonedaSeleccionada] = useState("");
    const navigate = useNavigate();

    const handleVerificarCuenta = async () => {

        if (destinoCuenta === "") {
            Swal.fire({
                title: "Error",
                text: "Ingrese el número de cuenta",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        let data = {
            cuenta: destinoCuenta,
        }

        try {
            fetch(`${import.meta.env.VITE_API_HOST}/depositos/consultar_cuenta`, {
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
                        setTipoCuenta(data.data.tipo);
                        setMoneda(data.data.moneda);
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            destinoCuenta,
            montoDepositar,
            moneda: monedaSeleccionada,
            crea: user
        };

        try {
            fetch(`${import.meta.env.VITE_API_HOST}/deposito`, {
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
                            title: "Depósito realizado con éxito",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
                        handleConfirmacionDeposito(data = { depositoId: data.depositoId, destinoCuenta, montoDepositar, moneda, crea: user, tipoCuenta });
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
                text: "Ocurrió un error al realizar el depósito",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (

        <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
            <Col md={8}>
                <Card>
                    <Card.Header className="bg-primary text-white text-center">
                        <h4>Deposito en Cuenta</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <label htmlFor="" className="form-label">Número de cuenta</label>
                                <Col xs={6} md={6}>
                                    <input type="number"
                                        class="form-control"
                                        placeholder="xxxxxxx"
                                        value={destinoCuenta}
                                        onChange={(e) => setDestinoCuenta(e.target.value)}
                                        required />
                                </Col>
                                <Col xs={6} md={4} style={{ width: '50%' }}>
                                    <Button variant="primary" 
                                            type="button" 
                                            style={{ width: '100%' }}
                                            onClick={handleVerificarCuenta}
                                    >
                                    Verificar 
                                    </Button>
                                </Col>
                            </Row>

                            {/* Datos de la cuenta */}

                            {propietario != "" && (
                                <Row>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Propietario de Cuenta</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Propietario de cuenta"
                                            value={propietario}
                                            readOnly
                                            required />
                                    </Col>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Tipo de Cuenta</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Tipo de cuenta"
                                            value={tipoCuenta}
                                            readOnly
                                            required />
                                    </Col>
                                    <Col className=" m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Moneda de Cuenta</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Tipo de cuenta"
                                            value={moneda}
                                            readOnly
                                            required />
                                    </Col>
                                    <div className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Seleccionar Moneda</label>
                                        <select
                                            className="form-control"
                                            value={monedaSeleccionada}
                                            onChange={(e) => setMonedaSeleccionada(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Seleccione una moneda</option>
                                            {monedas.map((moneda, index) => (
                                                <option key={index} value={moneda}>
                                                    {moneda}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="m-1" >
                                        <label htmlFor="" className="form-label">Monto a depositar</label>
                                        <input type="number"
                                            class="form-control"
                                            placeholder="Monto"
                                            onChange={(e) => setMontoDepositar(e.target.value)}
                                            required />
                                    </div>
                                    {/* Botón de Depositar */}
                                    <div className="d-grid mt-3">
                                        <Button variant="success"
                                            type="submit"
                                        >
                                            Depositar
                                        </Button>
                                    </div>
                                </Row>

                            )}



                            {/* Botón de Cancelar */}
                            <div className="d-grid mt-3">
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
            </Col>
        </Row>
    );
}

export default FormDeposito;
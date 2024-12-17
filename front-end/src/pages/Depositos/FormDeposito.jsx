import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Logo from '../../assets/logo.png';
import { useLocation, useNavigate } from "react-router-dom";

function FormDeposito() {
    const [origenCuenta, setOrigenCuenta] = useState("");
    const [destinoCuenta, setDestinoCuenta] = useState("");
    const [montoDepositar, setMontoDepositar] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const paymentMethod = location.state?.paymentMethod // tipo de pago efectivo/tranferencia

    // useEffect(()=>{
    //     if(!typeMov || !paymentMethod){
    //         navigate("/modulo-depositos");
    //     }
    // },[typeMov,paymentMethod,navigate])

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            destinoCuenta,
            origenCuenta,
            montoDepositar,
            paymentMethod,
            crea: 'Juan'
        };

        if (paymentMethod === 'Transferencia') {
            try {
                const response = await fetch("http://localhost:4000/deposito_transferencia", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const errorData = await response.json();

                if (response.ok) {
                    alert("Depósito realizado con éxito");
                    navigate("/metodo-deposito");
                } else if (response.status === 404) {
                    alert(`Error: ${errorData.message}`);
                } else if (response.status === 422) {
                    alert(`Error: ${errorData.message}`);
                } else if (response.status === 500) {
                    alert(`Error: ${errorData.message}`);
                } else {
                    alert("Hubo un error al realizar el depósito");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar al servidor");
            }
        } else {

            try {
                const response = await fetch("http://localhost:4000/deposito_efectivo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const errorData = await response.json();

                if (response.ok) {
                    alert("Depósito realizado con éxito");
                    navigate("/metodo-deposito");
                } else if (response.status === 404) {
                    alert(`Error: ${errorData.message}`);
                } else if (response.status === 422) {
                    alert(`Error: ${errorData.message}`);
                } else if (response.status === 500) {
                    alert(`Error: ${errorData.message}`);
                } else {
                    alert("Hubo un error al realizar el depósito");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar al servidor");
            }
        }
    };

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Deposito en {paymentMethod}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    {paymentMethod == 'Transferencia' && (
                                        <div className="col-8 m-4">
                                            <label htmlFor="" className="form-label">Numero de cuenta <strong>(Origen)</strong></label>
                                            <input type="text"
                                                class="form-control"
                                                placeholder="xxxxxxx"
                                                onChange={(e) => setOrigenCuenta(e.target.value)}
                                                required />
                                        </div>
                                    )}
                                    <div className="col-8 m-4">
                                        <label htmlFor="" className="form-label">Numero de cuenta <strong>(Destino)</strong></label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="xxxxxxx"
                                            onChange={(e) => setDestinoCuenta(e.target.value)}
                                            required />
                                    </div>
                                    <div className="col-8 m-4">
                                        <label htmlFor="" className="form-label">Monto a depositar</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Q 1000.00"
                                            onChange={(e) => setMontoDepositar(e.target.value)}
                                            required />
                                    </div>
                                </div>

                                {/* Botón de Depositar */}
                                <div className="d-grid m-1">
                                    <Button variant="success"
                                        type="submit"
                                    >
                                        Depositar
                                    </Button>
                                </div>
                                {/* Botón de Cancelar */}
                                <div className="d-grid m-1">
                                    <Button variant="danger"
                                        type="button"
                                        onClick={() => navigate('/metodo-deposito')}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormDeposito;
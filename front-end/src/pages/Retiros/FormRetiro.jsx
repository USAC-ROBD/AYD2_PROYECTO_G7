import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Logo from '../../assets/logo.png';
import { useLocation, useNavigate } from "react-router-dom";

function FormRetiro() {
    const [origenCuenta, setOrigenCuenta] = useState("");
    const [montoRetirar, setMontoRetirar] = useState("");
    const [token,setToken] = useState("")
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const typeMov = location.state?.typeMov // tipo de moviento deposito/retiro

    const returnMethod = location.state?.paymentMethod // tipo de pago Ventanilla/Cajero

    // useEffect(()=>{
    //     if(!typeMov || !paymentMethod){
    //         navigate("/modulo-depositos");
    //     }
    // },[typeMov,paymentMethod,navigate])

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            origenCuenta,
        };

        try {
            const response = await fetch("http://localhost:4000/generar_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const errorData = await response.json();

            if (response.ok) {
                setShowModal(true)
            } else {
                alert("Hubo un error al realizar el retiro");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar al servidor");
        }

    };

    const submitData = async (e) => {
        e.preventDefault();

        const data = {
            origenCuenta,
            montoRetirar,
            returnMethod,
            crea: 'Juan',
            token,
        };

        try {
            const response = await fetch("http://localhost:4000/retirar_dinero", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const errorData = await response.json();

            if (response.ok) {
                alert("Retiro realizado con éxito");
                navigate("/metodo-deposito");
            } else if (response.status === 500) {
                alert(`Error: ${errorData.message}`);
            } else {
                alert("Hubo un error al realizar el retiro");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar al servidor");
        }
    }

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Retiro en {returnMethod}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <div className="col-8 m-4">
                                        <label htmlFor="" className="form-label">Numero de cuenta <strong>(Origen)</strong></label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="xxxxxxx"
                                            onChange={(e) => setOrigenCuenta(e.target.value)}
                                            required />
                                    </div>
                                    <div className="col-8 m-4">
                                        <label htmlFor="" className="form-label">Monto a retirar</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Q 1000.00"
                                            onChange={(e) => setMontoRetirar(e.target.value)}
                                            required />
                                    </div>
                                </div>

                                {/* Botón de Depositar */}
                                <div className="d-grid m-1">
                                    <Button variant="success"
                                        // data-bs-toggle="modal" 
                                        // data-bs-target="#tokenRetiro"
                                        type="submit"
                                    >
                                        Retirar
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

            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                id="tokenRetiro"
                tabIndex="-1"
                aria-labelledby="tokenRetiroLabel"
                aria-hidden={!showModal}
                style={{
                    display: showModal ? "block" : "none",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="tokenRetiroLabel">
                                Token
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Ingrese el token que fue enviado a su correo electrónico
                            <input type="text" 
                            className="form-control" 
                            onChange={(e) => setToken(e.target.value)}
                            required />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cerrar
                            </button>
                            <button type="button" className="btn btn-primary"
                                onClick={submitData}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
}

export default FormRetiro;
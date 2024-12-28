import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FormRetiro({ handleConfirmacionRetiro, user }) {
    const [origenCuenta, setOrigenCuenta] = useState("");
    const [montoRetirar, setMontoRetirar] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [moneda, setMoneda] = useState("");
    const [propietario, setPropietario] = useState("");
    const [saldoDisponible, setSaldoDisponible] = useState("");
    const navigate = useNavigate();

    const handleVerificarCuenta = async () => {
        if (origenCuenta === "") {
            Swal.fire({
                title: "Error",
                text: "Ingrese el número de cuenta",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        let data = {
            cuenta: origenCuenta,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/retiros/consultar_cuenta`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) {
                setPropietario(result.data.nombre);
                setTipoCuenta(result.data.tipo);
                setMoneda(result.data.moneda);
                setSaldoDisponible(result.data.saldo);
            } else {
                Swal.fire({
                    title: "Error",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al verificar la cuenta",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (montoRetirar > saldoDisponible) {
            Swal.fire({
                title: "Error",
                text: "El monto a retirar excede el saldo disponible",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        const data = {
            origenCuenta,
            montoRetirar,
            moneda,
            crea: user,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/retiro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.status === 200) {
                Swal.fire({
                    title: "Retiro realizado con éxito",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                handleConfirmacionRetiro({
                    retiroId: result.retiroId,
                    origenCuenta,
                    montoRetirar,
                    moneda,
                    crea: user,
                    tipoCuenta,
                    saldoRestante: saldoDisponible - montoRetirar,
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al realizar el retiro",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <Row className="justify-content-center" style={{ width: "100%", paddingLeft: "15%", paddingRight: "15%" }}>
            <Col md={8}>
                <Card>
                    <Card.Header className="bg-primary text-white text-center">
                        <h4>Retiro de Cuenta</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <label htmlFor="" className="form-label">Número de cuenta</label>
                                <Col xs={6} md={6}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="xxxxxxx"
                                        value={origenCuenta}
                                        onChange={(e) => setOrigenCuenta(e.target.value)}
                                        name="origenCuenta"
                                        required
                                    />
                                </Col>
                                <Col xs={6} md={4} style={{ width: "50%" }}>
                                    <Button
                                        variant="primary"
                                        type="button"
                                        style={{ width: "100%" }}
                                        onClick={handleVerificarCuenta}
                                        name="consultar"
                                    >
                                        Verificar
                                    </Button>
                                </Col>
                            </Row>

                            {/* Datos de la cuenta */}
                            {propietario && (
                                <Row>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Propietario de Cuenta</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={propietario}
                                            readOnly
                                        />
                                    </Col>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Tipo de Cuenta</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={tipoCuenta}
                                            readOnly
                                        />
                                    </Col>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Moneda</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={moneda}
                                            readOnly
                                        />
                                    </Col>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Saldo Disponible</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={`Q. ${saldoDisponible}`}
                                            readOnly
                                        />
                                    </Col>
                                    <Col className="m-1" xs={12}>
                                        <label htmlFor="" className="form-label">Monto a Retirar</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Monto"
                                            name="montoRetirar"
                                            onChange={(e) => setMontoRetirar(parseFloat(e.target.value))}
                                            required
                                        />
                                    </Col>
                                    <div className="d-grid mt-3">
                                        <Button name="retirar" variant="success" type="submit">
                                            Retirar
                                        </Button>
                                    </div>
                                </Row>
                            )}

                            {/* Botón de Cancelar */}
                            <div className="d-grid mt-3">
                                <Button variant="danger" type="button" onClick={() => navigate("/menu")}>
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

export default FormRetiro;

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function FormPagoServicios({handleConfirmacionPago, user, service, paymentMethod}) { //Recibe el usuario, el tipo de servicio y el metodo de pago. 
    // Se recibe la funcion handleConfirmacionPago para cambiar al componente de confirmacion de pago en el componente padre en caso de que el pago sea exitoso
    const [duenoServicio, setDuenoServicio] = useState("");
    const [montoPagar, setMontoPagar] = useState("");
    const [codigoServicio, setCodigoServicio] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [cuenta, setCuenta] = useState(""); //Cuenta del usuario
    const [dpi, setDpi] = useState(""); //DPI del usuario
    const navigate = useNavigate();

    // Maneja los cambios en los inputs
    const handleChangeCode = (e) => {
        setCodigoServicio(e.target.value);
    };

    const handleChangeCuenta = (e) => {
        setCuenta(e.target.value);
    };

    const handleChangeDpi = (e) => {
        setDpi(e.target.value);
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //validar el codigo del servicio
        if (codigoServicio === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el código del servicio",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        //validar el tipo de servicio

        let tipo = -1;

        if (service === "Agua") {
            tipo = 1;
        }
        else if (service === "Luz") {
            tipo = 2;
        }
        else if (service === "Telefono") {
            tipo = 3;
        }
        else if (service === "Internet") {
            tipo = 4;
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Tipo de servicio no válido",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        //validar metodo de pago


        if (paymentMethod === "Transferencia" && cuenta === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el número de cuenta",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        if (paymentMethod === "Transferencia" && dpi === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el DPI",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const data = {};

        if (paymentMethod === "Transferencia") {
            data.codigo = codigoServicio;
            data.monto = montoPagar;
            data.cuenta = cuenta;
            data.dpi = dpi;
            data.encargado = user; //Nombre del cajero logueado

            //realizar pago con transferencia
            //mostramos una alerta para confirmar el pago

            Swal.fire({

                title: '¿Está seguro de realizar el pago?',
                text: "Se debitará el monto a la cuenta " + cuenta,
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: `Realizar Pago`,
                denyButtonText: `Cancelar`
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${import.meta.env.VITE_API_HOST}/realizar_pago_transferencia`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status !== 200) {
                                Swal.fire({
                                    icon: 'error',
                                    title: data.message,
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                                return;
                            }
                            Swal.fire({
                                icon: 'success',
                                title: data.message,
                                showConfirmButton: false,
                                timer: 3000
                            });
                            handleConfirmacionPago(data= {pagoId:data.pagoId, service: service, paymentMethod: paymentMethod, codigo: codigoServicio, monto: montoPagar, dueno: duenoServicio, encargado: user, proveedor: proveedor, cuenta: cuenta });
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            Swal.fire({
                                icon: 'error',
                                title: "Error al realizar el pago",
                                showConfirmButton: false,
                                timer: 3000
                            });
                        });
                }
            });
        }
        else if (paymentMethod === "Efectivo") {
            data.codigo = codigoServicio;
            data.monto = montoPagar;
            data.encargado = user; //Nombre del cajero logueado

            //realizar pago con efectivo
            //mostramos una alerta para confirmar el pago

            Swal.fire({

                title: '¿Está seguro de realizar el pago?',
                text: "Asegurese de recibir el monto de Q." + montoPagar + " en efectivo",
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: `Realizar Pago`,
                denyButtonText: `Cancelar`
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${import.meta.env.VITE_API_HOST}/realizar_pago_efectivo`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status !== 200) {
                                Swal.fire({
                                    icon: 'error',
                                    title: data.message,
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                                return;
                            }
                            Swal.fire({
                                icon: 'success',
                                title: data.message,
                                showConfirmButton: false,
                                timer: 3000
                            });
                            handleConfirmacionPago(data= {pagoId:data.pagoId, service: service, paymentMethod: paymentMethod, codigo: codigoServicio, monto: montoPagar, dueno: duenoServicio, encargado: user, proveedor: proveedor });
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            Swal.fire({
                                icon: 'error',
                                title: "Error al realizar el pago",
                                showConfirmButton: false,
                                timer: 3000
                            });
                        });
                }
            });
        };
    }

    const handleConsultarServicio = (e) => {
        e.preventDefault();
        //validar el codigo del servicio
        if (codigoServicio === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el código del servicio",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        //validar el tipo de servicio

        let tipo = -1;
        if (service === "Agua") {
            tipo = 1;
        } else if (service === "Luz") {
            tipo = 2;
        } else if (service === "Telefono") {
            tipo = 3;
        } else if (service === "Internet") {
            tipo = 4;
        } else {
            Swal.fire({
                icon: 'error',
                title: "Tipo de servicio no válido",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const data = {
            codigo: codigoServicio,
            tipo: tipo
        }

        //consultar el servicio
        fetch(`${import.meta.env.VITE_API_HOST}/consultar_servicio`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== 200) {
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setDuenoServicio("");
                    setMontoPagar("");
                    setProveedor("");
                    setCuenta("");
                    return;
                }

                setDuenoServicio(data.data.dueno);
                setMontoPagar(data.data.monto);
                setProveedor(data.data.proveedor);
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: "Error al consultar el servicio",
                    showConfirmButton: false,
                    timer: 2000
                });
            })

    }

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Pago de Servicio de {service}</h4>
                            <h5>Metodo de Pago:{paymentMethod}</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form>

                                <Row>
                                    <Col xs={12} md={8}>
                                        {/* Código del servicio */}
                                        <Form.Group className="mb-3" controlId="serviceCode">
                                            <Form.Label>Código del Servicio</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el código del servicio"
                                                name="serviceCode"
                                                value={codigoServicio}
                                                onChange={handleChangeCode}
                                                required
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4} className="d-flex align-items-end">
                                        {/* Botón de Enviar */}
                                        <div className=" pb-3">
                                            <Button variant="success" type="button" onClick={handleConsultarServicio} style={{ width: '100%' }}>
                                                Consultar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {duenoServicio !== "" && montoPagar !== "" && (
                                    <div>
                                        {/* Nombre del dueño del servicio */}
                                        <Form.Group className="mb-3" controlId="ownerName">
                                            <Form.Label>Nombre del dueño del Servicio</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el nombre completo"
                                                name="ownerName"
                                                value={duenoServicio}
                                                readOnly
                                                required
                                            />
                                        </Form.Group>

                                        {/* Monto a pagar */}
                                        <Form.Group className="mb-3" controlId="amount">
                                            <Form.Label>Monto a Pagar</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese el monto en quetzales"
                                                name="amount"
                                                value={montoPagar}
                                                readOnly
                                                required
                                            />
                                        </Form.Group>

                                        {/* Proveedor */}
                                        <Form.Group className="mb-3" controlId="proveedor">
                                            <Form.Label>Proveedor de Servicio</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Proveedor"
                                                name="proveedor"
                                                value={proveedor}
                                                readOnly
                                                required
                                            />
                                        </Form.Group>

                                        {/* Cuenta a debitar | Aqui se debe de mostrar la cuenta del usuario si el metodo de pago es transferencia*/}

                                        {
                                            paymentMethod === "Transferencia" && (
                                                < Form.Group className="mb-3" controlId="cuenta">
                                                    <Form.Label>Cuenta</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Ingrese el numero de Cuenta"
                                                        name="cuenta"
                                                        value={cuenta}
                                                        onChange={handleChangeCuenta}
                                                        autoComplete="off"
                                                        required
                                                    />
                                                </Form.Group>
                                            )
                                        }

                                        {
                                            paymentMethod === "Transferencia" && (
                                                <Form.Group className="mb-3" controlId="dpi">
                                                    <Form.Label>DPI</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Ingrese el DPI"
                                                        name="dpi"
                                                        value={dpi}
                                                        onChange={handleChangeDpi}
                                                        autoComplete="off"
                                                        required
                                                    />
                                                </Form.Group>
                                            )
                                        }


                                        {/* Botón de Enviar */}
                                        <div className="d-grid">
                                            <Button variant="success" type="button" onClick={handleSubmit}>
                                                Realizar Pago
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Botón de Cancelar */}
                                <div className="d-grid mt-4">
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
        </Container >
    );
}

export default FormPagoServicios;
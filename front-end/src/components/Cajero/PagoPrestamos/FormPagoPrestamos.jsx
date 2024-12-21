import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function FormPagoPrestamos({ handleConfirmacionPago, user, tipoPago }) {
    const [duenoServicio, setDuenoServicio] = useState("");
    const [montoTotal, setMontoTotal] = useState(""); //Monto total que se debe del prestamo
    const [montoPagar, setMontoPagar] = useState(""); //Monto que se va a pagar
    const [codigoPrestamo, setCodgoPrestamo] = useState("");
    const [cuenta, setCuenta] = useState(""); //Cuenta del usuario
    const [disableMontoPagar, setDisableMontoPagar] = useState(false); //Variable para deshabilitar el campo de monto a pagar si el pago es total
    const navigate = useNavigate();

    // Maneja los cambios en los inputs
    const handleChangeCode = (e) => {
        setCodgoPrestamo(e.target.value);
    };

    const handleChangeCuenta = (e) => {
        setCuenta(e.target.value);
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //validar el codigo del prestamo
        if (codigoPrestamo === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el código del Prestamo",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        //validar que se llene el monto a pagar si es parcial
        if (tipoPago === "Parcial" && montoPagar === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el monto a pagar",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        //validar metodo de pago


        if (cuenta === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el número de cuenta",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const data = {};


        data.codigo = codigoPrestamo;
        data.monto = montoPagar;
        data.cuenta = cuenta;
        data.encargado = user;

        //realizar pago con transferencia
        //mostramos una alerta para confirmar el pago

        Swal.fire({

            title: '¿Está seguro de realizar el pago?',
            text: "Se debitara Q." + montoPagar + " de la cuenta " + cuenta,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: `Realizar Pago`,
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_HOST}/realizar_pago_prestamo_transferencia`, {
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
                        handleConfirmacionPago(data = { pagoId:data.pagoId, tipoPago, paymentMethod: "Transferencia", codigo: codigoPrestamo, monto: montoPagar, montoSaldo: montoTotal, dueno: duenoServicio, encargado: user, cuenta: cuenta });
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

    const handleConsultarPrestamo = (e) => {
        e.preventDefault();
        //validar el codigo del servicio
        if (codigoPrestamo === "") {
            Swal.fire({
                icon: 'error',
                title: "Debe ingresar el código del Prestamo",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const data = {
            codigo: codigoPrestamo
        }

        //consultar el servicio
        fetch(`${import.meta.env.VITE_API_HOST}/consultar_prestamo`, {
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
                    setMontoTotal("");
                    setCuenta("");
                    setDisableMontoPagar(false);
                    return;
                }

                setDuenoServicio(data.data.beneficiario);
                setMontoTotal(data.data.monto);
                setCodgoPrestamo(data.data.codigo);
                if (tipoPago === "Total") {
                    setMontoPagar(data.data.monto);
                    // hacemos que el campo de monto a pagar sea de solo lectura
                    setDisableMontoPagar(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: "Error al consultar el prestamo",
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
                            <h4>Pago de Prestamo {tipoPago}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>

                                <Row>
                                    <Col xs={12} md={8}>
                                        {/* Código del servicio */}
                                        <Form.Group className="mb-3" controlId="loanCode">
                                            <Form.Label>Código del Prestamo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el código del prestamo"
                                                name="loanCode"
                                                value={codigoPrestamo}
                                                onChange={handleChangeCode}
                                                required
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4} className="d-flex align-items-end">
                                        {/* Botón de Enviar */}
                                        <div className=" pb-3">
                                            <Button variant="success" type="button" onClick={handleConsultarPrestamo} style={{ width: '100%' }}>
                                                Consultar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {duenoServicio !== "" && montoTotal !== "" && (
                                    <div>
                                        {/* CUI del dueño del servicio */}
                                        <Form.Group className="mb-3" controlId="ownerName">
                                            <Form.Label>Beneficiario</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Beneficiario"
                                                name="ownerName"
                                                value={duenoServicio}
                                                readOnly
                                                required
                                            />
                                        </Form.Group>

                                        {/* Monto De Deuda */}
                                        <Form.Group className="mb-3" controlId="amount">
                                            <Form.Label>Monto del Prestamo</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Monto del Prestamo"
                                                name="amount"
                                                value={montoTotal}
                                                readOnly
                                                required
                                            />
                                        </Form.Group>

                                        {/* Monto a Pagar */}
                                        <Form.Group className="mb-3" controlId="amountPay">
                                            <Form.Label>Monto a Pagar</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Monto a Pagar"
                                                name="amountPay"
                                                value={montoPagar}
                                                readOnly={disableMontoPagar}
                                                required
                                                onChange={(e) => {
                                                    if (!disableMontoPagar) setMontoPagar(e.target.value);
                                                }}
                                            />
                                        </Form.Group>

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
                                        onClick={() => navigate('/menu', { state: { user } })}
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

export default FormPagoPrestamos;
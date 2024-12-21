import React, { useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Logo from '../../../assets/logo.png';
import Firma from '../../../assets/Firma.png';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

function ConfirmacionPagoPrestamos({ dataPago }) {
    const navigate = useNavigate();
    const idPago = dataPago?.pagoId; //id del pago
    const tipoPago = dataPago?.tipoPago; //tipo de pago, total o parcial
    const paymentMethod = "Transferencia"; //metodo de pago
    const codigo = dataPago?.codigo; //codigo del prestamo
    const monto = dataPago?.monto; //monto a pagar
    const montoSaldo = dataPago?.montoSaldo; //saldo del prestamo
    const dueno = dataPago?.dueno; //dueño del prestamo
    const encargado = dataPago?.encargado; //cajero que realiza el pago
    const cuenta = dataPago?.cuenta; //cuenta a la que se hará la transferencia

    const date = new Date();
    const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const logoWidth = 100;
        const logoHeight = 25;

        // Agregar el logo
        doc.addImage(Logo, "PNG", 50, 10, logoWidth, logoHeight);

        // Título
        doc.setFontSize(18);
        doc.text("Comprobante de Pago de Prestamo", 50, 40);

        // Información del Pago
        doc.setFontSize(12);
        doc.text(`ID del Pago: ${idPago}`, 10, 40);
        doc.text(`Codigo del Prestamo: ${codigo}`, 10, 50);
        doc.text(`Dueño del Prestamo: ${dueno}`, 10, 60);
        doc.text(`Método de Pago: ${paymentMethod}`, 10, 70);
        doc.text(`Tipo de Pago: ${tipoPago}`, 10, 80);
        doc.text(`Saldo Anterior: Q.${montoSaldo}`, 10, 90);
        doc.text(`Monto Pagado: Q.${monto}`, 10, 100);
        doc.text(`Nuevo Saldo: Q.${montoSaldo - monto}`, 10, 110);
        doc.text(`Fecha: ${fecha}` + `  ${hora}`, 10, 120);
        doc.text(`Cuenta: ${cuenta}`, 10, 130);

        doc.text(`Encargado del Pago: ${encargado}`, 10, 150);


        // Firma
        doc.text("Firma:", 10, 160);
        doc.addImage(Firma, "PNG", 10, 165, 50, 20); // Ajusta las dimensiones según la firma

        // Guardar el PDF
        doc.save("comprobante_pago_prestamo.pdf");
    };




    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Confirmación de Pago de Prestamo {tipoPago}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ID del Pago</td>
                                        <td>{idPago}</td>
                                    </tr>
                                    <tr>
                                        <td>Prestamo</td>
                                        <td>{codigo}</td>
                                    </tr>
                                    <tr>
                                        <td>Método de Pago</td>
                                        <td>{paymentMethod}</td>
                                    </tr>
                                    <tr>
                                        <td>Tipo de Pago</td>
                                        <td>{tipoPago}</td>
                                    </tr>
                                    <tr>
                                        <td>Saldo</td>
                                        <td>Q.{montoSaldo}</td>
                                    </tr>
                                    <tr>
                                        <td>Monto Pagado</td>
                                        <td>Q.{monto}</td>
                                    </tr>
                                    <tr>
                                        <td>Dueño</td>
                                        <td>{dueno}</td>
                                    </tr>
                                    <tr>
                                        <td>Encargado</td>
                                        <td>{encargado}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha</td>
                                        <td>{fecha} {hora}</td>
                                    </tr>
                                    <tr>
                                        <td>Cuenta</td>
                                        <td>{cuenta}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="d-grid ">
                                <button
                                    className="btn btn-success mb-2"
                                    type="button"
                                    onClick={handleGeneratePDF}
                                >
                                    Generar Comprobante
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => navigate("/menu")}
                                >
                                    Finalizar
                                </button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmacionPagoPrestamos;

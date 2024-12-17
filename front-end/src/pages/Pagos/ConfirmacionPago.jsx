import React, { useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Logo from '../../assets/logo.png';
import Firma from '../../assets/Firma.png';
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

function ConfirmacionPagoServicios() {
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state?.service;  //tipo de pago luz, agua, internet
    const paymentMethod = location.state?.paymentMethod; //metodo de pago, efectivo, transferencia
    const codigo = location.state?.codigo; //codigo del servicio
    const monto = location.state?.monto; //monto del servicio
    const dueno = location.state?.dueno; //dueno del servicio
    const encargado = location.state?.encargado; //encargado del pago
    const proveedor = location.state?.proveedor; //proveedor del servicio
    const cuenta = location.state?.cuenta; //cuenta del cliente que paga por transferencia unicamente
    
    const date = new Date();
    const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    useEffect(() => {
        if (!service || !paymentMethod || !codigo || !monto || !dueno || !encargado || !proveedor) {
            console.log(service, paymentMethod, codigo, monto, dueno, encargado, proveedor);
            console.log("Faltan datos");
            navigate("/menu");
        }
    }, [service, paymentMethod, codigo, monto, dueno, encargado, proveedor, navigate]); // Solo se ejecuta si alguno de estos valores cambia


    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const logoWidth = 100;
        const logoHeight = 25;

        // Agregar el logo
        doc.addImage(Logo, "PNG", 50, 10, logoWidth, logoHeight);

        // Título
        doc.setFontSize(18);
        doc.text("Comprobante de Pago de Servicio", 50, 40);

        // Información del Pago
        doc.setFontSize(12);
        doc.text(`Codigo del Servicio: ${codigo}`, 10, 50);
        doc.text(`Dueño del Servicio: ${dueno}`, 10, 60);
        doc.text(`Método de Pago: ${paymentMethod}`, 10, 70);
        doc.text(`Servicio: ${service}`, 10, 80);
        doc.text(`Monto: Q.${monto}`, 10, 90);
        doc.text(`Proveedor: ${proveedor}`, 10, 100);
        doc.text(`Fecha: ${fecha}` + `  ${hora}`, 10, 110);
        if (paymentMethod === "Transferencia") {
            doc.text(`Cuenta: ${cuenta}`, 10, 120);
        }

        doc.text(`Encargado del Pago: ${encargado}`, 10, 150);
        

        // Firma
        doc.text("Firma:", 10, 160);
        doc.addImage(Firma, "PNG", 10, 165, 50, 20); // Ajusta las dimensiones según la firma

        // Guardar el PDF
        doc.save("comprobante_pago_servicios.pdf");
    };


    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%' }} alt="logo" />

            <Row className="justify-content-center" style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Confirmación de Pago de Servicio de {service}</h4>
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
                                        <td>Servicio</td>
                                        <td>{service}</td>
                                    </tr>
                                    <tr>
                                        <td>Método de Pago</td>
                                        <td>{paymentMethod}</td>
                                    </tr>
                                    <tr>
                                        <td>Código de Servicio</td>
                                        <td>{codigo}</td>
                                    </tr>
                                    <tr>
                                        <td>Monto</td>
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
                                        <td>Proveedor</td>
                                        <td>{proveedor}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha</td>
                                        <td>{fecha} {hora}</td>
                                    </tr>
                                    {paymentMethod === "Transferencia" && (
                                        <tr>
                                            <td>Cuenta</td>
                                            <td>{cuenta}</td>
                                        </tr>
                                    )}
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
                                    onClick={() => navigate("/menu", { state: { user: encargado } })}
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

export default ConfirmacionPagoServicios;

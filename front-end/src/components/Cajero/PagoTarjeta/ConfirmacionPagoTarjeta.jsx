import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Logo from '../../../assets/logo.png';
import Firma from '../../../assets/Firma.png';
import { useNavigate } from 'react-router-dom';

function ConfirmacionPagoTarjeta({ data }) {
    const navigate = useNavigate();
    const { idPago, numeroTarjeta, montoUso, montoDeuda, intereses, totalPagar, crea, moneda } = data;

    const date = new Date();
    const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.addImage(Logo, 'PNG', 50, 10, 100, 25);
        doc.setFontSize(18);
        doc.text('Comprobante de Pago de Tarjeta', 50, 50);

        doc.setFontSize(12);
        doc.text(`ID del Pago: ${idPago}`, 10, 70);
        doc.text(`Número de Tarjeta: ${numeroTarjeta}`, 10, 80);
        doc.text(`Monto por Uso: ${moneda} ${montoUso}`, 10, 90);
        doc.text(`Monto de Deuda: ${moneda} ${montoDeuda}`, 10, 100);
        doc.text(`Intereses: ${moneda} ${intereses}`, 10, 110);
        doc.text(`Total Pagado: ${moneda} ${totalPagar}`, 10, 120);
        doc.text(`Cajero: ${crea}`, 10, 130);
        doc.text(`Fecha: ${fecha} ${hora}`, 10, 140);

        doc.addImage(Firma, 'PNG', 10, 160, 50, 20);
        doc.save('comprobante_pago_tarjeta.pdf');
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Confirmación de Pago</h4>
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>ID del Pago</td>
                                        <td>{idPago}</td>
                                    </tr>
                                    <tr>
                                        <td>Número de Tarjeta</td>
                                        <td>{numeroTarjeta}</td>
                                    </tr>
                                    <tr>
                                        <td>Monto por Uso</td>
                                        <td>{moneda} {montoUso}</td>
                                    </tr>
                                    <tr>
                                        <td>Monto de Deuda</td>
                                        <td>{moneda} {montoDeuda}</td>
                                    </tr>
                                    <tr>
                                        <td>Intereses</td>
                                        <td>{moneda} {intereses}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Pagado</td>
                                        <td>{moneda} {totalPagar}</td>
                                    </tr>
                                    <tr>
                                        <td>Cajero</td>
                                        <td>{crea}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <button className="btn btn-success" onClick={handleGeneratePDF}>
                                Generar Comprobante
                            </button>

                            <button className="btn btn-danger m-2" onClick={() => navigate('/menu')}>
                                Finalizar
                            </button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmacionPagoTarjeta;

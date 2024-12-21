import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Logo from "../../../assets/logo.png";
import Firma from "../../../assets/Firma.png";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function ConfirmacionRetiro({ data }) {
  const navigate = useNavigate();
  const {
    retiroId,
    origenCuenta,
    montoRetirar,
    moneda,
    crea,
    tipoCuenta,
    saldoRestante,
  } = data;

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
    doc.text("Comprobante de Retiro", 50, 40);

    // Información del Retiro
    doc.setFontSize(12);
    doc.text(`ID del Retiro: ${retiroId}`, 10, 50);
    doc.text(`Cuenta Origen: ${origenCuenta}`, 10, 60);
    doc.text(`Monto Retirado: ${montoRetirar} ${moneda}`, 10, 70);
    doc.text(`Saldo Restante: ${saldoRestante} ${moneda}`, 10, 80);
    doc.text(`Tipo de Cuenta: ${tipoCuenta}`, 10, 90);
    doc.text(`Cajero: ${crea}`, 10, 100);
    doc.text(`Fecha: ${fecha} ${hora}`, 10, 110);

    // Firma
    doc.text("Firma:", 10, 130);
    doc.addImage(Firma, "PNG", 10, 135, 50, 20); // Ajusta las dimensiones según la firma

    // Guardar el PDF
    doc.save("comprobante_retiro.pdf");
  };

  return (
    <Container
      className="mt-5"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Row
        className="justify-content-center"
        style={{ width: "100%", paddingLeft: "15%", paddingRight: "15%" }}
      >
        <Col md={8}>
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h4>Confirmación de Retiro</h4>
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
                    <td>ID del Retiro</td>
                    <td>{retiroId}</td>
                  </tr>
                  <tr>
                    <td>Cuenta Origen</td>
                    <td>{origenCuenta}</td>
                  </tr>
                  <tr>
                    <td>Monto Retirado</td>
                    <td>{montoRetirar} {moneda}</td>
                  </tr>
                  <tr>
                    <td>Saldo Restante</td>
                    <td>{saldoRestante} {moneda}</td>
                  </tr>
                  <tr>
                    <td>Tipo de Cuenta</td>
                    <td>{tipoCuenta}</td>
                  </tr>
                  <tr>
                    <td>Cajero</td>
                    <td>{crea}</td>
                  </tr>
                  <tr>
                    <td>Fecha</td>
                    <td>{fecha} {hora}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-grid">
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

export default ConfirmacionRetiro;

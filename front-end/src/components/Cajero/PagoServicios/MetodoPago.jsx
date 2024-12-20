import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiArrowFromRight } from 'react-icons/bi';
import { FaMoneyBillWave } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";

function MetodoPago({handleSelectTipoPago}) { // Recibimos la función handleSelectTipoPago como prop para guardar el tipo de pago seleccionado
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '75vw', minHeight: '75vh' }}>
      <h1>Método de Pago</h1>
      <Row className="mt-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => handleSelectTipoPago('Efectivo')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <FaMoneyBillWave style={{ width: '50%', height: '50%' }} />
            Efectivo
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => handleSelectTipoPago('Transferencia')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <GrMoney style={{ width: '50%', height: '50%' }} />
            Cuenta Bancaria
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => navigate('/menu')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <BiArrowFromRight style={{ width: '50%', height: '50%' }} />
            Cancelar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default MetodoPago;

import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import { BiArrowFromRight } from 'react-icons/bi';
import { FaMoneyBillWave } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function MetodoPagoPrestamos() {
  const navigate = useNavigate();
  const location = useLocation();
  const tipoPago = location.state?.tipoPago;  // puede ser 'Total' o 'Parcial'
  const user = location.state?.user; // usuario encargado del negocio

  useEffect(() => {
    if (!tipoPago) {
      navigate("/menu", { state: { user } });
    }
  }, [tipoPago, navigate]); // Solo se ejecuta si alguno de estos valores cambia

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%'}} alt="logo" />
      <h1>Método de Pago</h1>
      <Row className="mt-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
      >
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/form-pago-prestamos', { state: { tipoPago, paymentMethod: 'Efectivo', user } })}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <FaMoneyBillWave style={{ width: '50%', height: '50%' }} />
            Efectivo
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/form-pago-prestamos', { state: { tipoPago, paymentMethod: 'Transferencia', user } })}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <GrMoney style={{ width: '50%', height: '50%' }} />
            Cuenta Bancaria
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => navigate('/pago-prestamos', { state: { user } })}
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

export default MetodoPagoPrestamos;

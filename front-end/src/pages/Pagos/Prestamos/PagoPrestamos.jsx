import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import { BsCircleHalf } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { BiArrowFromRight } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PagoPrestamos() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate("/menu", { state: { user } });
    }
  }, [user, navigate]); // Solo se ejecuta si alguno de estos valores cambia

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%'}} alt="logo" />
      <h1>Pagar Prestamo</h1>
      <Row className="mt-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
      >
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/metodo-pago-prestamos', { state: { tipoPago: 'Total', user } })}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <FaCircle style={{ width: '50%', height: '50%' }} />
            Pago Total
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/metodo-pago-prestamos', { state: { tipoPago: 'Parcial', user } })}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <BsCircleHalf style={{ width: '50%', height: '50%' }} />
            Pago Parcial
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => navigate('/menu', { state: { user } })}
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

export default PagoPrestamos;

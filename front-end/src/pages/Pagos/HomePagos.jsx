import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ServiceIcon from '../../assets/service-icon.png';
import LoanIcon from '../../assets/prestamos-icon.png';
import Logo from '../../assets/logo.png';
import { BiArrowFromRight} from 'react-icons/bi';

function HomePagos() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%' }} alt="logo" />
      <h1>Módulo de Pagos</h1>
      <Row className="mt-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/pago-servicios')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img src={ServiceIcon} alt="services-icon" style={{ width: '50%', height: '50%' }} />
            Pago de Servicios
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/pago-prestamos')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img src={LoanIcon} alt="services-icon" style={{ width: '50%', height: '50%' }} />
            Pago de Préstamos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            //onClick={() => navigate('/')}
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

export default HomePagos;

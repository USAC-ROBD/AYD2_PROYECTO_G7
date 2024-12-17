import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DepositIcon from '../../assets/deposit.png';
import WithdrawIcon from '../../assets/money-withdrawal.png';
import Logo from '../../assets/logo.png';
import { BiArrowFromRight} from 'react-icons/bi';

function HomeDeposito() {
  const navigate = useNavigate();

  return (
    <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%' }} alt="logo" />
      <h1>Movimiento de fondos</h1>
      <Row className="m-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
      >
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/metodo-deposito',{state:{typeMov:'Deposito'}})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img src={DepositIcon} alt="services-icon" style={{ width: '50%', height: '50%' }} />
            Deposito
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/metodo-retiro')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img src={WithdrawIcon} alt="services-icon" style={{ width: '50%', height: '50%' }} />
            Retiro
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

export default HomeDeposito;

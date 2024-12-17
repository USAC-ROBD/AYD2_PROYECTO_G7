import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { BsFillPersonFill } from "react-icons/bs";
import { BiArrowFromRight } from 'react-icons/bi';
import { IoCash } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function MetodoDeposito() {
  const navigate = useNavigate();
  const location = useLocation();
  const typeMov = location.state?.typeMov;

  // useEffect(()=>{
  //   if(!typeMov){
  //     navigate("/modulo-depositos")
  //   }
  // },[typeMov, navigate])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%'}} alt="logo" />
      <h1>Método de Deposito</h1>
      <Row className="mt-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
      >
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/form-retiro',{state:{paymentMethod: 'Ventanilla' }})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <BsFillPersonFill style={{ width: '50%', height: '50%' }} />
            Ventanilla
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/form-retiro',{state:{paymentMethod: 'Cajero Automatico'}})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <IoCash style={{ width: '50%', height: '50%' }} />
            Cajero automatico
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100"
            onClick={() => navigate('/metodo-deposito')}
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

export default MetodoDeposito;

import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { BiArrowFromRight } from 'react-icons/bi';
import { IoIosWater } from "react-icons/io";
import { TiLightbulb } from "react-icons/ti";
import { FaPhone } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { useEffect } from 'react';
import useAuth from '../../hook/useAuth';

function PagoServicios() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, rol } = useAuth();  // Usamos el hook personalizado para obtener el usuario y rol

  if (!user) {
    return <div>Loading...</div>;  // Muestra un cargando mientras se obtiene el usuario
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      
      <img src={Logo} style={{ width: '65%' }} alt="logo" />
      <h1>Pago de Servicios</h1>
      <p>user: {user}</p>
      <p>rol: {rol}</p>
      <Row className="mt-4" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => navigate('/metodo-pago', { state: { service: 'Luz', user } })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TiLightbulb style={{ width: '50%', height: '50%' }} />
            Luz
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => navigate('/metodo-pago', { state: { service: 'Agua', user } })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IoIosWater style={{ width: '50%', height: '50%' }} />
            Agua
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => navigate('/metodo-pago', { state: { service: 'Telefono', user } })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FaPhone style={{ width: '50%', height: '50%' }} />
            Teléfono
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => navigate('/metodo-pago', { state: { service: 'Internet', user } })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TbWorldWww style={{ width: '50%', height: '50%' }} />
            Internet
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-danger" size="lg" className="w-100" onClick={() => navigate('/menu', { state: { user } })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BiArrowFromRight style={{ width: '50%', height: '50%' }} />
            Cancelar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default PagoServicios;

import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiArrowFromRight } from 'react-icons/bi';
import { IoIosWater } from "react-icons/io";
import { TiLightbulb } from "react-icons/ti";
import { FaPhone } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

function TipoServicio({ onSelectTipoServicio }) { // Recibimos la función onSelectTipoServicio como prop para guardar el tipo de servicio seleccionado
    const navigate = useNavigate();

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '80vw', minHeight: '75vh' }}>
      <h1>Tipo de Servicio</h1>
      <Row className="mt-4" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button name='luz' variant="outline-success" size="lg" className="w-100" onClick={() => onSelectTipoServicio('Luz')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TiLightbulb style={{ width: '50%', height: '50%' }} />
            Luz
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => onSelectTipoServicio('Agua')}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IoIosWater style={{ width: '50%', height: '50%' }} />
            Agua
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => onSelectTipoServicio('Telefono')}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FaPhone style={{ width: '50%', height: '50%' }} />
            Teléfono
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-success" size="lg" className="w-100" onClick={() => onSelectTipoServicio('Internet')}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TbWorldWww style={{ width: '50%', height: '50%' }} />
            Internet
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button variant="outline-danger" size="lg" className="w-100" onClick={() => navigate('/menu')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BiArrowFromRight style={{ width: '50%', height: '50%' }} />
            Cancelar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TipoServicio;

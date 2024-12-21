import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { BiArrowFromRight } from 'react-icons/bi';
import { FaSearch, FaMoneyBillWave } from "react-icons/fa";

export default function TipoConsultas({handleSelectTipoConsulta}) {
    const navigate = useNavigate();

    return (

        <Row className="mt-4"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
        >
            <Col xs={12} sm={6} md={3} className="mb-3">
                <Button
                    variant="outline-success"
                    size="lg"
                    className="w-100"
                    onClick={() => handleSelectTipoConsulta('Busqueda Cliente')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <FaSearch style={{ width: '50%', height: '50%' }} />
                    Buscar Cliente
                </Button>
            </Col>
            <Col xs={12} sm={6} md={3} className="mb-3">
                <Button
                    variant="outline-success"
                    size="lg"
                    className="w-100"
                    onClick={() => handleSelectTipoConsulta('Saldo Actual')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <FaMoneyBillWave style={{ width: '50%', height: '50%' }} />
                    Saldo Actual
                </Button>
            </Col>
            <Col xs={12} sm={6} md={3} className="mb-3">
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
    );
}
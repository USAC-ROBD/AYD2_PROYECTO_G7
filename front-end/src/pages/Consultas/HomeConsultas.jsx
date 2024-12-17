import { Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { BiArrowFromRight } from 'react-icons/bi';
import { FaSearch, FaMoneyBillWave } from "react-icons/fa";

export default function HomeConsultas() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <img src={Logo} style={{ width: '65%'}} alt="logo" />
            <h1>Módulo de Consultas</h1>
            <Row className="mt-4"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
            >
                <Col xs={12} sm={6} md={3} className="mb-3">
                    <Button
                        variant="outline-success"
                        size="lg"
                        className="w-100"
                        onClick={() => navigate('/form-consulta', { state: { query: 'Busqueda Cliente', user } })}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
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
                        onClick={() => navigate('/form-consulta', { state: { query: 'Consulta Saldo', user } })}
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
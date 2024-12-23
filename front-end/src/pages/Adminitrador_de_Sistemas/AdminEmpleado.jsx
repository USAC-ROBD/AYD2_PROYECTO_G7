import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Logo from '../../assets/logo.png';
import { BiArrowFromRight } from 'react-icons/bi';
import { IoMdPersonAdd } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";
import { IoPersonRemove } from "react-icons/io5";
import { GoPasskeyFill } from "react-icons/go";


function AdminEmpleado() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};

    useEffect(() => {
        if (!user) {
          return navigate('/');
        }
    }, [user]); // useEffect dependerá de `user`

    if (!user) {
        return navigate('/');
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%'}} alt="logo" />
      <h1>Gestión de empleados</h1>
      <Row className="mt-4"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
      >
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/accion-admin',{state:{accion: 'RegistroEmpleado' }})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <IoMdPersonAdd style={{ width: '50%', height: '50%' }} />
            Registro de empleado
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/accion-admin',{state:{accion: 'AsignacionRol'}})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <BsPersonFillGear style={{ width: '50%', height: '50%' }} />
            Asignación de roles
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/accion-admin',{state:{accion: 'EliminarEmpleado'}})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <IoPersonRemove style={{ width: '50%', height: '50%' }} />
            Eliminar empleado
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Button
            variant="outline-success"
            size="lg"
            className="w-100"
            onClick={() => navigate('/accion-admin',{state:{accion: 'CambioContraseña'}})}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <GoPasskeyFill style={{ width: '50%', height: '50%' }} />
            Cambio de Contraseña
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
    </div>
    );
}

export default AdminEmpleado;

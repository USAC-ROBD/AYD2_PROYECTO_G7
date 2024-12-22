import { Container, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';

function AsignacionRol() {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%' }} alt="logo" />

      <Card style={{ width: "80%" }}>
        <Card.Header className="bg-primary text-white text-center">
          <h4> Rol de empleado </h4>
        </Card.Header>
        <Card.Body>
          <Form >
            <div>
              <div className="d-flex justify-content-center">
                <div className="col-4 m-4">
                  <label htmlFor="" className="form-label">Nombre Empleado</label>
                  <select name="" id="" class="form-select" aria-label="Default select example">
                    <option value="1">Soltero</option>
                    <option value="2">Casado</option>
                    <option value="3">Divorciado</option>
                    <option value="4">Viudo</option>
                  </select>
                </div>
                <div className="col-4 m-4">
                  <label htmlFor="" className="form-label">Rol actual</label>
                  <select name="" id="" class="form-select" aria-label="Default select example">
                    <option value="1">Soltero</option>
                    <option value="2">Casado</option>
                    <option value="3">Divorciado</option>
                    <option value="4">Viudo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botón de Depositar */}
            <div className="d-grid m-1">
              <Button variant="success"
                type="submit"
              >
                Guardar
              </Button>
            </div>
            {/* Botón de Cancelar */}
            <div className="d-grid m-1">
              <Button variant="danger"
                type="button"
                onClick={() => navigate('/menu')}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

    </Container>
  );
}

export default AsignacionRol;

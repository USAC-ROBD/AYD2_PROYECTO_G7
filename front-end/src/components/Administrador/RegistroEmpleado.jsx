import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';

function RegistroEmpleado() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%' }} alt="logo" />

      <Card style={{ width: "80%" }}>
        <Card.Header className="bg-primary text-white text-center">
          <h4>Registro de empleado </h4>
        </Card.Header>
        <Card.Body>
          <Form >
            <div>
              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Nombre</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Apellido</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Edad</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Número de teléfono</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Numero de DPI</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Correo electrónico</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Papelería completa (PDF)</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Fotografía</label>
                  <input type="text"
                    class="form-control"
                    placeholder=""
                    required />
                </div>
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Genero</label>
                  <select name="" id="" class="form-select" aria-label="Default select example">
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-3 m-4">
                  <label htmlFor="" className="form-label">Estado Civil</label>
                  <select name="" id="" class="form-select" aria-label="Default select example">
                  <option value="Soltero">Soltero</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viudo">Viudo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botón de Depositar */}
            <div className="d-grid m-1">
              <Button variant="success"
                type="submit"
              >
                Registrar
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

export default RegistroEmpleado;

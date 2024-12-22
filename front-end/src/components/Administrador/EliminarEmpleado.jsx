import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { MdDelete } from "react-icons/md";

function EliminarEmpleado() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
      <img src={Logo} style={{ width: '65%' }} alt="logo" />

      <Card style={{ width: "80%" }}>
        <Card.Header className="bg-primary text-white text-center">
          <h4> Empleados </h4>
        </Card.Header>
        <Card.Body>
          <Form >
            <div>
              <div className="d-flex justify-content-center">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Usuario</th>
                      <th scope="col">Rol</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>admin</td>
                      <td className="d-flex justify-content-start"><button className="btn btn-danger"><MdDelete /></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

export default EliminarEmpleado;

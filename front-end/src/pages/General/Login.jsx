import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de tener axios instalado
import Logo from "../../assets/logo.png";
import ClaveSupervisor from "../../components/Supervisor/ClaveSupervisor";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showClaveSupervisor, setShowClaveSupervisor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hacemos la solicitud POST al backend para obtener el JWT
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/login`,
        { username, password },
        {
          withCredentials: true,  // Permite el envío de cookies con la solicitud
        }
      );
      // validamos si el usuario es supervisor
      if (response.data.rol === 3) {
        // MOSTRAMOS EL COMPONENTE DE CLAVE SUPERVISOR
        setShowClaveSupervisor(true);
        return;
      }
      // Si la autenticación es exitosa, redirigimos al usuario
      navigate("/menu");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div>
      {!showClaveSupervisor && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "100vw",
            minHeight: "100vh",
          }}
        >
          <img src={Logo} style={{ width: "65%" }} alt="logo" />

          <Row
            className="mt-4"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Col xs={12} sm={6} md={4} className="mb-3">
              <div>
                <h1>Login</h1>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      )}


      {showClaveSupervisor && (
        <ClaveSupervisor username={username} />
      )}


    </div>


  );
}

export default Login;

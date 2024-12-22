-- Insertar datos en la tabla ROL
INSERT INTO ROL (NOMBRE, DESCRIPCION, CREA, ACTUALIZA)
VALUES 
('Administrador', 'Acceso a modulo Admin', 'admin', 'admin'),
('Cajero', 'Acceso a modulo cajero', 'admin', 'admin'),
('Supervisor', 'Acceso a modulo supervisor', 'admin', 'admin'),
('Agente Servicio al Cliente', 'Acceso a modulo supervisor', 'admin', 'admin');

-- Insertar datos en la tabla USUARIO
INSERT INTO USUARIO (USUARIO, CONTRASENA, NOMBRE, APELLIDO, CORREO, ESTADO, ID_ROL, CREA, ACTUALIZA)
VALUES 
('admin', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'John', 'Doe', 'jdoe@example.com', 'A', 1, 'admin', 'admin'),
('tiky', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Alice', 'Smith', 'asmith@example.com', 'A', 2, 'admin', 'admin'),
('bcarter', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Bob', 'Carter', 'bcarter@example.com', 'I', 3, 'admin', 'admin');
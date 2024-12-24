-- Insertar datos en la tabla ROL
INSERT INTO ROL (NOMBRE, DESCRIPCION, CREA, ACTUALIZA)
VALUES 
('Administrador', 'Acceso a modulo Admin', 'admin', 'admin'),
('Cajero', 'Acceso a modulo cajero', 'admin', 'admin'),
('Supervisor', 'Acceso a modulo supervisor', 'admin', 'admin'),
('Servicio al Cliente', 'Acceso a modulo callcenter', 'admin', 'admin');

-- Insertar datos en la tabla USUARIO
INSERT INTO USUARIO (
    USUARIO, 
    CONTRASENA, 
    NOMBRE, 
    APELLIDO, 
    CORREO, 
    TELEFONO, 
    EDAD, 
    CUI, 
    GENERO, 
    ESTADO_CIVIL, 
    PAPELERIA, 
    FOTO, 
    ESTADO, 
    ID_ROL, 
    CREA, 
    ACTUALIZA
) 
VALUES
('admin', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'John', 'Doe', 'jdoe@example.com', '12345678', 35, '3026416610103', 'M', 'S', NULL, NULL, 'A', 1, 'admin', 'admin'),
('tiky', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Alice', 'Smith', 'asmith@example.com', '98765432', 28, '1234567890123', 'F', 'C', NULL, NULL, 'A', 2, 'admin', 'admin'),
('bcarter', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Bob', 'Carter', 'bcarter@example.com', '56789012', 40, '9876543210987', 'M', 'D', NULL, NULL, 'I', 3, 'admin', 'admin'),
('ptrick', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Patrick', 'Star', 'ptrickstar@example.com', '87654321', 50, '3210987654321', 'M', 'V', NULL, NULL, 'A', 4, 'admin', 'admin'),
('janed', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Jane', 'Doe', 'janed@example.com', '45612378', 27, '1112223334445', 'F', 'S', NULL, NULL, 'P', 2, 'admin', 'admin'),
('mwill', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Michael', 'Williams', 'mwill@example.com', '32165487', 38, '5556667778889', 'M', 'C', NULL, NULL, 'A', 3, 'admin', 'admin'),
('lisat', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Lisa', 'Taylor', 'ltaylor@example.com', '78945612', 31, '4445556667778', 'F', 'S', NULL, NULL, 'A', 1, 'admin', 'admin'),
('samj', '$2a$10$sLiWO.iG/Qlyjk4hLGWsYuygk9u2VqcVrI6p6Z74sCKfP8B1gqW3e', 'Sam', 'Johnson', 'sjohnson@example.com', '65498732', 45, '7778889990001', 'M', 'D', NULL, NULL, 'A', 4, 'admin', 'admin');

-- Insertar datos en la tabla SERVICIO
insert into SERVICIO (NOMBRE, PROVEEDOR, MONTO, TIPO) values ('Steven Gonzalez', 'Empresa de Agua de Guatemala', 250.00, '1');
insert into SERVICIO (NOMBRE, PROVEEDOR, MONTO, TIPO) values ('Robin Buezo', 'Empresa Electrica de Guatemala', 300.00, '2');
insert into SERVICIO (NOMBRE, PROVEEDOR, MONTO, TIPO) values ('Danny Flow', 'Tigo Guatemala', 350.00, '4');
insert into SERVICIO (NOMBRE, PROVEEDOR, MONTO, TIPO) values ('Juan Pablo Gonzalez', 'Claro Guatemala', 400.00, '3');
insert into SERVICIO (NOMBRE, PROVEEDOR, MONTO, TIPO) values ('Eduardo Llamas', 'Claro Guatemala', 450.00, '3');

-- Insertar datos en la tabla CLIENTE
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (5261956868514, 'Feliza', 'Welden', '98 Eagan Court', 81301006, 'fwelden0@printfriendly.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (5035286411254, 'Etty', 'Jelk', '20 Grayhawk Drive', 54577609, 'ejelk1@hhs.gov', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (8552509080031, 'Trish', 'Bontein', '1 New Castle Circle', 27217428, 'tbontein2@ycombinator.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (2350670655803, 'Paige', 'Balden', '48919 Cottonwood Junction', 89199164, 'pbalden3@nhs.uk', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (1337396730153, 'Clare', 'Huckstepp', '66141 Dahle Parkway', 85349254, 'chuckstepp4@liveinternet.ru', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (5315680014795, 'Paton', 'Pietrowicz', '1748 Lyons Plaza', 27174667, 'ppietrowicz5@wikipedia.org', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (2101338571690, 'Joby', 'Giacobazzi', '94 Twin Pines Center', 68141497, 'jgiacobazzi6@digg.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (3014104678970, 'Mahmud', 'Champagne', '35336 Petterle Avenue', 26331539, 'mchampagne7@wired.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (3387971707846, 'Dorice', 'Arnfield', '6 Waxwing Way', 35830614, 'darnfield8@slideshare.net', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (1651089266561, 'Sonnie', 'Hammand', '071 Thompson Junction', 94324477, 'shammand9@quantcast.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (3134867754510, 'Pall', 'Ayto', '68 Larry Terrace', 38754483, 'paytoa@java.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (5817716454924, 'Freedman', 'Absolom', '7952 Clove Center', 52932059, 'fabsolomb@elegantthemes.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (5600082374876, 'Stanwood', 'Beckley', '38780 Melrose Point', 19231401, 'sbeckleyc@eventbrite.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (4930739728072, 'Elmira', 'Nisot', '78 Merry Point', 57806324, 'enisotd@salon.com', '¿Donde vive?', 'En mi casa');
insert into CLIENTE (CUI, NOMBRE, APELLIDO, DIRECCION, TELEFONO, EMAIL, PREGUNTA, RESPUESTA) values (7618410594855, 'Iosep', 'Ruslinge', '5 Sauthoff Street', 54331491, 'iruslingee@latimes.com', '¿Donde vive?', 'En mi casa');

-- Insertar datos en la tabla CUENTA
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5315680014795, 2347689986, 'M', 'Q', 1500.00, 1000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (2350670655803, 2704134101, 'A', 'Q', 100000.00, 10000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (1337396730153, 1753083963, 'A', 'D', 50.0, 15000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (7618410594855, 3510357039, 'M', 'Q', 0, 20000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5817716454924, 3312330206, 'M', 'Q', 0, 5000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (7618410594855, 8941449030, 'M', 'Q', 0, 50000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5315680014795, 6750602008, 'M', 'Q', 0, 10000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5817716454924, 4798167250, 'M', 'Q', 0, 25000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (2101338571690, 7958409612, 'M', 'Q', 0, 35000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (1337396730153, 6425759269, 'M', 'Q', 0, 40000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5261956868514, 4196506914, 'M', 'Q', 0, 45000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (4930739728072, 4803768558, 'M', 'Q', 0, 8000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5600082374876, 7787157363, 'M', 'Q', 0, 17000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (5261956868514, 9094450353, 'M', 'Q', 0, 15000);
insert into CUENTA (CUI, NUMERO, TIPO, MONEDA, SALDO, LIMITE_RETIRO) values (3014104678970, 5739181331, 'A', 'Q', 0, 20000);

-- Insertar datos en la tabla DIVISA
INSERT INTO DIVISA (NOMBRE, SIMBOLO, VALOR_COMPRA, VALOR_VENTA) VALUES ('Dolar', 'USD', 7.75, 7.85), ('Euro', 'EUR', 8.75, 8.85), ('Libra', 'GBP', 10.75, 10.85);

-- Insertar datos en la tabla Prestamo
insert into PRESTAMO (CUI, MONTO, SALDO) values (5261956868514, 10000, 10000);
insert into PRESTAMO (CUI, MONTO, SALDO) values (5035286411254, 20000, 20000);
insert into PRESTAMO (CUI, MONTO, SALDO) values (8552509080031, 30000, 30000);
insert into PRESTAMO (CUI, MONTO, SALDO) values (2350670655803, 40000, 40000);
insert into PRESTAMO (CUI, MONTO, SALDO) values (1337396730153, 50000, 50000);


-- Insertar datos en la tabla Tarjeta

-- Tarjetas de Débito (relacionadas con cuentas existentes)
INSERT INTO TARJETA (CUI, ID_CUENTA, ESTADO, NUMERO, TIPO, MONEDA, LIMITE, SALDO, VENCIMIENTO, CREA, ACTUALIZA)
VALUES
('5315680014795', 1, 'A', '4111111111111111', 'D', 'Q', 0.00, NULL, '2026-12-31', 'SYSTEM', 'SYSTEM'),
('2350670655803', 2, 'A', '4222222222222222', 'D', 'Q', 0.00, NULL, '2025-06-30', 'SYSTEM', 'SYSTEM'),
('1337396730153', 3, 'A', '4333333333333333', 'D', 'D', 0.00, NULL, '2027-03-15', 'SYSTEM', 'SYSTEM'),
('7618410594855', 4, 'A', '4444444444444444', 'D', 'Q', 0.00, NULL, '2025-11-01', 'SYSTEM', 'SYSTEM'),
('5817716454924', 5, 'A', '4555555555555555', 'D', 'Q', 0.00, NULL, '2026-01-20', 'SYSTEM', 'SYSTEM');

-- Tarjetas de Crédito con saldo adeudado
INSERT INTO TARJETA (CUI, ID_CUENTA, ESTADO, NUMERO, TIPO, MONEDA, LIMITE, SALDO, VENCIMIENTO, CREA, ACTUALIZA)
VALUES
('5315680014795', NULL, 'A', '5111111111111111', 'C', 'Q', 10000.00, 4500.00, '2026-09-30', 'SYSTEM', 'SYSTEM'),
('2350670655803', NULL, 'A', '5222222222222222', 'C', 'Q', 8000.00, 3000.00, '2025-12-15', 'SYSTEM', 'SYSTEM'),
('1337396730153', NULL, 'A', '5333333333333333', 'C', 'D', 15000.00, 1200.00, '2026-03-10', 'SYSTEM', 'SYSTEM'),
('7618410594855', NULL, 'A', '5444444444444444', 'C', 'Q', 20000.00, 10000.00, '2027-07-05', 'SYSTEM', 'SYSTEM'),
('5817716454924', NULL, 'A', '5555555555555555', 'C', 'Q', 12000.00, 6000.00, '2028-02-20', 'SYSTEM', 'SYSTEM');

-- Tarjetas de Crédito sin saldo adeudado
INSERT INTO TARJETA (CUI, ID_CUENTA, ESTADO, NUMERO, TIPO, MONEDA, LIMITE, SALDO, VENCIMIENTO, CREA, ACTUALIZA)
VALUES
('5315680014795', NULL, 'A', '5666666666666666', 'C', 'Q', 15000.00, 0.00, '2029-01-10', 'SYSTEM', 'SYSTEM'),
('1337396730153', NULL, 'A', '5777777777777777', 'C', 'D', 20000.00, 0.00, '2027-06-25', 'SYSTEM', 'SYSTEM'),
('7618410594855', NULL, 'A', '5888888888888888', 'C', 'Q', 10000.00, 0.00, '2025-09-30', 'SYSTEM', 'SYSTEM'),
('5817716454924', NULL, 'A', '5999999999999999', 'C', 'Q', 12000.00, 0.00, '2027-11-15', 'SYSTEM', 'SYSTEM');


-- Insertar datos en la tabla pagos de tarjeta

-- Pagos anteriores con diferentes fechas para simular intereses en tarjetas de crédito
INSERT INTO PAGO (TIPO, MODALIDAD, ID_TARJETA, MONTO, CREACION, CREA)
VALUES
('T', 'E', 6, 4500.00, '2024-12-01 10:30:00', 'SYSTEM'), -- Pago reciente, sin intereses
('T', 'E', 7, 3000.00, '2024-10-10 14:00:00', 'SYSTEM'), -- Pago retrasado, genera intereses
('T', 'E', 8, 1200.00, '2024-11-25 11:45:00', 'SYSTEM'), -- Pago reciente, sin intereses
('T', 'E', 9, 10000.00, '2024-09-15 09:20:00', 'SYSTEM'), -- Pago retrasado, genera intereses
('T', 'E', 10, 6000.00, '2024-07-20 15:30:00', 'SYSTEM'); -- Pago muy retrasado, genera intereses

-- Otros pagos realizados en diferentes meses para las mismas tarjetas
INSERT INTO PAGO (TIPO, MODALIDAD, ID_TARJETA, MONTO, CREACION, CREA)
VALUES
('T', 'E', 6, 4500.00, '2024-03-15 10:30:00', 'SYSTEM'), -- Pago puntual, sin intereses
('T', 'E', 7, 3000.00, '2024-02-10 14:00:00', 'SYSTEM'), -- Pago puntual, sin intereses
('T', 'E', 8, 1200.00, '2024-01-25 11:45:00', 'SYSTEM'), -- Pago puntual, sin intereses
('T', 'E', 9, 10000.00, '2023-12-15 09:20:00', 'SYSTEM'), -- Pago puntual, sin intereses
('T', 'E', 10, 6000.00, '2023-11-20 15:30:00', 'SYSTEM'); -- Pago retrasado, genera intereses


-- Insertar datos en la tabla Quejas
insert into QUEJA (CUI, CATEGORIA, DESCRIPCION, CREA) values (5261956868514, 'A', 'La atencion al cliente es pesima', 'admin');
insert into QUEJA (CUI, CATEGORIA, DESCRIPCION, CREA) values (5035286411254, 'P', 'La tarjeta de crédito tiene cargos no reconocidos', 'admin');
insert into QUEJA (CUI, CATEGORIA, DESCRIPCION, CREA) values (8552509080031, 'S', 'El cajero automatico no me dio el dinero', 'admin');
insert into QUEJA (CUI, CATEGORIA, DESCRIPCION, CREA) values (2350670655803, 'A', 'La persona que me atendio no sabia nada', 'admin');
insert into QUEJA (CUI, CATEGORIA, DESCRIPCION, CREA) values (1337396730153, 'P', 'La cuenta de ahorro no da los intereses prometidos', 'admin');
insert into QUEJA (CUI, CATEGORIA, DESCRIPCION, CREA) values (7618410594855, 'S', 'El servicio de préstamo es muy caro', 'admin');
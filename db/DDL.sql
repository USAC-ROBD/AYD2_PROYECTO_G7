DROP DATABASE IF EXISTS MONEY_BIN;
CREATE DATABASE MONEY_BIN;
USE MONEY_BIN;

--  Tablas
CREATE TABLE SUCURSAL (
    ID_SUCURSAL INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(100) NOT NULL,
    DIRECCION VARCHAR(100) NOT NULL,
    TELEFONO VARCHAR(15) NOT NULL,
    CORREO VARCHAR(100) NOT NULL,
    EFECTIVO DECIMAL(19,2) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM'
);

CREATE TABLE ROL (
    ID_ROL INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL,
    DESCRIPCION VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM'
);

CREATE TABLE USUARIO (
    ID_USUARIO INT PRIMARY KEY AUTO_INCREMENT,
    USUARIO VARCHAR(50) NOT NULL,
    CONTRASENA VARCHAR(100) NOT NULL,
    NOMBRE VARCHAR(100) NOT NULL,
    APELLIDO VARCHAR(100) NOT NULL,
    TELEFONO VARCHAR(15) NOT NULL,
    CORREO VARCHAR(100) NOT NULL,
    EDAD INT NOT NULL,
    CUI VARCHAR(13) NOT NULL,
    GENERO CHAR(1) NOT NULL,  -- M: Masculino, F: Femenino
    ESTADO_CIVIL CHAR(1) NOT NULL,  -- S: Soltero, C: Casado, D: Divorciado, V: Viudo
    PAPELERIA LONGBLOB,
    FOTO LONGBLOB,
    ESTADO CHAR(1) NOT NULL,  -- A: Activo, I: Inactivo, B: Bloqueado, P: Pendiente
    ID_ROL INT NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_USUARIO_ROL FOREIGN KEY (ID_ROL) REFERENCES ROL(ID_ROL),
    CONSTRAINT CK_ESTADO_USUARIO CHECK (ESTADO IN ('A', 'I', 'B', 'P')),     -- A: Activo, I: Inactivo, B: Bloqueado, P: Pendiente
    CONSTRAINT CK_GENERO_USUARIO CHECK (GENERO IN ('M', 'F')),     -- M: Masculino, F: Femenino
    CONSTRAINT CK_ESTADO_CIVIL_USUARIO CHECK (ESTADO_CIVIL IN ('S', 'C', 'D', 'V'))     -- S: Soltero, C: Casado, D: Divorciado, V: Viudo
);

CREATE TABLE CLIENTE (
    CUI VARCHAR(13) PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    APELLIDO VARCHAR(100) NOT NULL,
    DIRECCION VARCHAR(100) NOT NULL,
    TELEFONO VARCHAR(15) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL,
    PREGUNTA VARCHAR(100) NOT NULL,
    RESPUESTA VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM'
);

CREATE TABLE CUENTA (
    ID_CUENTA INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    NUMERO VARCHAR(20) UNIQUE NOT NULL,
    TIPO CHAR(1) NOT NULL,    -- M: Monetaria, A: Ahorro
    MONEDA CHAR(3) NOT NULL,  -- Q: Quetzales, D: Dólares
    SALDO DECIMAL(19,2) NOT NULL,
    LIMITE_RETIRO DECIMAL(19,2) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_CUENTA_CLIENTE FOREIGN KEY (CUI) REFERENCES CLIENTE(CUI),
    CONSTRAINT CK_TIPO_CUENTA CHECK (TIPO IN ('M', 'A')),     -- M: Monetaria, A: Ahorro
    CONSTRAINT CK_MONEDA_CUENTA CHECK (MONEDA IN ('Q', 'D'))     -- Q: Quetzales, D: Dólares
);

CREATE TABLE TARJETA (
    ID_TARJETA INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    ID_CUENTA INT,
    ESTADO CHAR(1) NOT NULL,  -- A: Activa, I: Inactiva
    NUMERO VARCHAR(20) UNIQUE NOT NULL,
    TIPO CHAR(1) NOT NULL,    -- D: Débito, C: Crédito
    MONEDA CHAR(3) NOT NULL,  -- Q: Quetzales, D: Dólares
    LIMITE DECIMAL(19,2) NOT NULL,
    SALDO DECIMAL(19,2), -- Saldo de la tarjeta que adeuda el cliente, las de debito no tienen saldo adeudado por eso es nulo en esos casos
    VENCIMIENTO DATE NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_TARJETA_CUENTA FOREIGN KEY (ID_CUENTA) REFERENCES CUENTA(ID_CUENTA),
    CONSTRAINT CK_TIPO_TARJETA CHECK (TIPO IN ('D', 'C')),     -- D: Débito, C: Crédito
    CONSTRAINT CK_MONEDA_TARJETA CHECK (MONEDA IN ('Q', 'D')),     -- Q: Quetzales, D: Dólares
    CONSTRAINT CK_ID_CUENTA CHECK (ID_CUENTA IS NOT NULL AND TIPO = 'D' OR ID_CUENTA IS NULL AND TIPO = 'C'),
    CONSTRAINT CK_ESTADO_TARJETA CHECK (ESTADO IN ('A', 'I'))     -- A: Activa, I: Inactiva
);

CREATE TABLE BLOQUEO (
    ID_BLOQUEO INT PRIMARY KEY AUTO_INCREMENT,
    ID_TARJETA INT NOT NULL,
    MOTIVO CHAR(1) NOT NULL,  -- R: Robo, P: Pérdida, F: Fraude
    DESCRIPCION VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_BLOQUEO_TARJETA FOREIGN KEY (ID_TARJETA) REFERENCES TARJETA(ID_TARJETA),
    CONSTRAINT CK_MOTIVO_BLOQUEO CHECK (MOTIVO IN ('R', 'P', 'F'))     -- R: Robo, P: Pérdida, F: Fraude
);

CREATE TABLE SOLICITUD (
    ID_SOLICITUD INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    ID_CUENTA INT,
    ID_TARJETA INT,
    TIPO CHAR(1) NOT NULL,    -- C: Cancelación de Servicio, S: Solicitud de Servicio
    TIPO_SERVICIO CHAR(1) NOT NULL,    -- T: Tarjeta, P: Préstamo
    TIPO_PRESTAMO CHAR(1),    -- P: Personal, H: Hipotecario, A: Automotriz
    MONTO DECIMAL(19,2),
    PLAZO INT,
    ESTADO CHAR(1) NOT NULL,  -- P: Pendiente, A: Aprobada, R: Rechazada
    DESCRIPCION VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_SOLICITUD_CLIENTE FOREIGN KEY (CUI) REFERENCES CLIENTE(CUI),
    CONSTRAINT FK_SOLICITUD_CUENTA FOREIGN KEY (ID_CUENTA) REFERENCES CUENTA(ID_CUENTA),
    CONSTRAINT FK_SOLICITUD_TARJETA FOREIGN KEY (ID_TARJETA) REFERENCES TARJETA(ID_TARJETA),
    CONSTRAINT CK_TIPO_SERVICIO CHECK (TIPO IN ('T', 'P')),     -- T: Tarjeta, P: Préstamo
    CONSTRAINT CK_ESTADO_SOLICITUD CHECK (ESTADO IN ('P', 'A', 'R')),     -- P: Pendiente, A: Aprobada, R: Rechazada
    CONSTRAINT CK_TIPO_PRESTAMO CHECK (TIPO_PRESTAMO IN ('P', 'H', 'A') AND TIPO = 'P' OR TIPO_PRESTAMO IS NULL AND TIPO = 'T'),
    CONSTRAINT CK_MONTO_SOLICITUD CHECK (MONTO > 0 AND TIPO = 'P' OR MONTO IS NULL AND TIPO = 'T'),
    CONSTRAINT CK_PLAZO_SOLICITUD CHECK (PLAZO > 0 AND TIPO = 'P' OR PLAZO IS NULL AND TIPO = 'T'),
    CONSTRAINT CK_TIPO_SOLICITUD CHECK (TIPO IN ('C', 'S'))     -- C: Cancelación de Servicio, S: Solicitud de Servicio
);

CREATE TABLE SOLICITUD_DOCUMENTO (
    ID_SOLICITUD INT,
    NOMBRE VARCHAR(100) NOT NULL,
    RUTA VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT PK_SOLICITUD_DOCUMENTO PRIMARY KEY (ID_SOLICITUD, NOMBRE),
    CONSTRAINT FK_SOLICITUD_DOCUMENTO_SOLICITUD FOREIGN KEY (ID_SOLICITUD) REFERENCES SOLICITUD(ID_SOLICITUD)
);

CREATE TABLE ENCUESTA (
    ID_ENCUESTA INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    CATEGORIA CHAR(1) NOT NULL,    -- A: Atención, P: Productos, S: Servicios
    CALIFICACION INT NOT NULL,
    COMENTARIO VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_ENCUESTA_CLIENTE FOREIGN KEY (CUI) REFERENCES CLIENTE(CUI),
    CONSTRAINT CK_CATEGORIA_ENCUESTA CHECK (CATEGORIA IN ('A', 'P', 'S'))     -- A: Atención, P: Productos, S: Servicios
);

CREATE TABLE ENCUESTA_DETALLE (
    ID_ENCUESTA_DET INT PRIMARY KEY AUTO_INCREMENT,
    ID_ENCUESTA INT,
    PREGUNTA VARCHAR(100),
    RESPUESTA CHAR(1) NOT NULL,    -- M: Muy Satisfecho, S: Satisfecho, N: Neutral, I: Insatisfecho, MI: Muy Insatisfecho
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_ENCUESTA_DETALLE_ENCUESTA FOREIGN KEY (ID_ENCUESTA) REFERENCES ENCUESTA(ID_ENCUESTA),
    CONSTRAINT CK_RESPUESTA_ENCUESTA_DETALLE CHECK (RESPUESTA IN ('M', 'S', 'N', 'I', 'MI'))     -- M: Muy Satisfecho, S: Satisfecho, N: Neutral, I: Insatisfecho, MI: Muy Insatisfecho
);

CREATE TABLE QUEJA (
    ID_QUEJA INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    CATEGORIA CHAR(1) NOT NULL,    -- A: Atención, P: Productos, S: Servicios
    DESCRIPCION VARCHAR(100) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_QUEJA_CLIENTE FOREIGN KEY (CUI) REFERENCES CLIENTE(CUI),
    CONSTRAINT CK_CATEGORIA_QUEJA CHECK (CATEGORIA IN ('A', 'P', 'S'))     -- A: Atención, P: Productos, S: Servicios
);

CREATE TABLE SERVICIO (
    ID_SERVICIO INT PRIMARY KEY AUTO_INCREMENT,
    TIPO CHAR(1) NOT NULL,    -- 1: Agua, 2: Electricidad, 3: Teléfono, 4: Internet
    NOMBRE VARCHAR(100) NOT NULL,
    PROVEEDOR VARCHAR(100) NOT NULL,
    MONTO DECIMAL(19,2) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM'
);

CREATE TABLE PRESTAMO (
    ID_PRESTAMO INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    MONTO DECIMAL(19,2) NOT NULL,
    SALDO DECIMAL(19,2) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_PRESTAMO_CLIENTE FOREIGN KEY (CUI) REFERENCES CLIENTE(CUI)
);

CREATE TABLE PAGO (
    ID_PAGO INT PRIMARY KEY AUTO_INCREMENT,
    TIPO CHAR(1) NOT NULL,   -- S: Servicio, P: Prestamo, T: Tarjeta
    MODALIDAD CHAR(1) NOT NULL,  -- E: Efectivo, T: Transferencia
    ID_SERVICIO INT,
    ID_PRESTAMO INT,
    ID_TARJETA INT,
    ID_CUENTA INT,
    MONTO DECIMAL(19,2) NOT NULL,
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT CK_TIPO_PAGO CHECK (TIPO IN ('S', 'P', 'T')),     -- S: Servicio, P: Prestamo, T: Tarjeta
    CONSTRAINT CK_MODALIDAD_PAGO CHECK (MODALIDAD IN ('E', 'T')),     -- E: Efectivo, T: Transferencia
    CONSTRAINT FK_PAGO_SERVICIO FOREIGN KEY (ID_SERVICIO) REFERENCES SERVICIO(ID_SERVICIO),
    CONSTRAINT FK_PAGO_PRESTAMO FOREIGN KEY (ID_PRESTAMO) REFERENCES PRESTAMO(ID_PRESTAMO),
    CONSTRAINT FK_PAGO_TARJETA FOREIGN KEY (ID_TARJETA) REFERENCES TARJETA(ID_TARJETA),
    CONSTRAINT FK_PAGO_CUENTA FOREIGN KEY (ID_CUENTA) REFERENCES CUENTA(ID_CUENTA),
    CONSTRAINT CK_ID_SERVICIO CHECK (ID_SERVICIO IS NULL AND TIPO = 'P' OR ID_SERVICIO IS NOT NULL AND TIPO = 'S' OR ID_SERVICIO IS NULL AND TIPO = 'T' OR ID_SERVICIO IS NOT NULL AND TIPO = 'T'),
    CONSTRAINT CK_ID_PRESTAMO CHECK (ID_PRESTAMO IS NULL AND TIPO = 'S' OR ID_PRESTAMO IS NOT NULL AND TIPO = 'P' OR ID_PRESTAMO IS NULL AND TIPO = 'T' OR ID_PRESTAMO IS NOT NULL AND TIPO = 'T'),
    CONSTRAINT CK_ID_CUENTA_PAGO CHECK (ID_CUENTA IS NULL AND MODALIDAD = 'E' OR ID_CUENTA IS NOT NULL AND MODALIDAD = 'T')
);

CREATE TABLE RETIRO (
    ID_RETIRO INT PRIMARY KEY AUTO_INCREMENT,
    ID_CUENTA INT NOT NULL,
    TIPO CHAR(1) NOT NULL,
    MONTO DECIMAL(19,2) NOT NULL,
    MONEDA CHAR(1) NOT NULL,  -- Q: Quetzales, D: Dólares
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_RETIRO_CUENTA FOREIGN KEY (ID_CUENTA) REFERENCES CUENTA(ID_CUENTA),
    CONSTRAINT CK_TIPO_RETIRO CHECK (TIPO IN ('C', 'V'))     -- C: Cajero, V: Ventanilla
);

CREATE TABLE DEPOSITO (
    ID_DEPOSITO INT PRIMARY KEY AUTO_INCREMENT,
    ID_CUENTA INT NOT NULL,
    ID_CUENTA_ORIGEN INT,
    TIPO CHAR(1) NOT NULL,
    MONTO DECIMAL(19,2) NOT NULL,
    MONEDA CHAR(1) NOT NULL,  -- Q: Quetzales, D: Dólares
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_DEPOSITO_CUENTA FOREIGN KEY (ID_CUENTA) REFERENCES CUENTA(ID_CUENTA),
    CONSTRAINT FK_DEPOSITO_CUENTA_ORIGEN FOREIGN KEY (ID_CUENTA_ORIGEN) REFERENCES CUENTA(ID_CUENTA),
    CONSTRAINT CK_TIPO_DEPOSITO CHECK (TIPO IN ('E', 'T')),     -- E: Efectivo, T: Transferencia
    CONSTRAINT CK_ID_CUENTA_ORIGEN CHECK (ID_CUENTA_ORIGEN IS NULL AND TIPO = 'E' OR ID_CUENTA_ORIGEN IS NOT NULL AND TIPO = 'T')
);

CREATE TABLE DIVISA(
    ID_DIVISA INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(100) NOT NULL,
    SIMBOLO VARCHAR(5) NOT NULL,
    VALOR_COMPRA DECIMAL(19,2) NOT NULL, -- Valor en Quetzales
    VALOR_VENTA DECIMAL(19,2) NOT NULL, -- Valor en Quetzales
    CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ACTUALIZA VARCHAR(50) DEFAULT 'SYSTEM'
);

CREATE TABLE CAMBIO_MONEDA (
    ID_CAMBIO INT PRIMARY KEY AUTO_INCREMENT,
    CUI VARCHAR(13) NOT NULL,
    MONTO DECIMAL(19,2) NOT NULL,
    MONEDA_ORIGEN CHAR(3) NOT NULL, -- Ej: 'Q'
    MONEDA_DESTINO CHAR(3) NOT NULL, -- Ej: 'D'
    FECHA_CAMBIO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CREA VARCHAR(50) DEFAULT 'SYSTEM',
    CONSTRAINT FK_CAMBIO_CLIENTE FOREIGN KEY (CUI) REFERENCES CLIENTE(CUI),
    CONSTRAINT CK_MONEDAS CHECK (MONEDA_ORIGEN = 'Q' AND MONEDA_DESTINO = 'D') -- Validar quetzales a dólares
);


DELIMITER //

CREATE TRIGGER generar_numero_cuenta
BEFORE INSERT ON CUENTA
FOR EACH ROW
BEGIN
    SET NEW.NUMERO = (
		SELECT FLOOR(1000000000 + RAND() * 8999999999)
		FROM dual
		WHERE NOT EXISTS (
			SELECT 1 FROM CUENTA WHERE NUMERO = FLOOR(1000000000 + RAND() * 8999999999)
		) LIMIT 1
	);
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER generar_numero_tarjeta
BEFORE INSERT ON TARJETA
FOR EACH ROW
BEGIN
    SET NEW.NUMERO = (
		SELECT FLOOR(1000000000 + RAND() * 8999999999)
		FROM dual
		WHERE NOT EXISTS (
			SELECT 1 FROM TARJETA WHERE NUMERO = FLOOR(1000000000 + RAND() * 8999999999)
		) LIMIT 1
	);
END //

DELIMITER ;
# Pruebas de Aceptación - Proyecto - Grupo 7

## Resumen
| Código |        Prueba        |    Rol Asociado     | Resultado |
|   -    |          -           |          -          |     -     |
| PA-01  | Inicio de Sesión     | Todos los roles     | APROBADO  |
| PA-02  | Pago de Servicios    | Cajero              | APROBADO  |
| PA-03  | Creación de Cuentas  | Atención al Cliente | APROBADO  |
| PA-04  | Creación de Tarjetas | Atención al Cliente | APROBADO  |
| PA-05  | - | - | APROBADO |

## PA-01. Inicio de Sesión
* **Objetivo**: Verificar que los usuarios pueden iniciar sesión correctamente y que se validan las credenciales.
* **Precondiciones**
    - Tener usuarios registrados con credenciales válidas.
* **Entradas**
    - Correo electrónico
    - Contraseña
    - Nombre de usuario
* **Escenarios**
    - Iniciar sesión con credenciales correctas.
        - Ingreso de credenciales.  
            ![PA-01](./PA-01/1.png)
        - Módulo Administrador
            - Entrada exitosa.  
                ![PA-01](./PA-01/2.png)
        - Módulo Cajero.  
            - Entrada exitosa.  
                ![PA-01](./PA-01/3.png)
        - Módulo Supervisor.  
            - Carga de archivo clave `.ayd`.  
                ![PA-01](./PA-01/4.png)
            - Entrada exitosa.  
                ![PA-01](./PA-01/5.png)
        - Módulo Atención al Cliente.  
            - Entrada exitosa.  
                ![PA-01](./PA-01/6.png)
    - Intentar iniciar sesión con una contraseña incorrecta.
        ![PA-01](./PA-01/7.png)
    - Intentar iniciar sesión con un correo no registrado.
        ![PA-01](./PA-01/8.png)
* **Resultados**
    - Todos los inicios de sesión resultaron exitosos con cada uno de los distintos roles.
    - Mensaje de error para credenciales incorrectas.

## PA-02. Pago de Servicios (Módulo Cajero)
* **Objetivo**: Validar que el sistema permita registrar pagos de servicios básicos correctamente.
* **Precondiciones**
    - Tener configurados servicios básicos.
    - Tener cuentas bancarias en el sistema.
* **Entradas**
    * Datos del titular
    * Código de servicio
    * Monto
    * Número de cuenta (si aplica)
* **Escenarios**
    * Realizar un pago en efectivo.
        - Pago de Servicio de Luz.  
            ![PA-02](./PA-02/1.png)
            ![PA-02](./PA-02/2.png)
    * Realizar un pago desde una cuenta bancaria.
        - Pago de Servicio de Agua.  
            ![PA-02](./PA-02/3.png)
            ![PA-02](./PA-02/4.png)
    * Intentar realizar un pago con datos incompletos.
        - Se muestra un mensaje de error en caso de que alguno de los campos permanezca vacío y se intente completar la operación.  
            ![PA-02](./PA-02/5.png)
* **Resultados**
    * Todos los pagos se realizaron exitosamente cuando se ingresaron datos en todos los campos obligatorios.
    * Mensaje de error cuando algún campo obligatorio permaneció vacío.

## PA-03. Creación de Cuentas (Módulo Atención al Cliente)
* **Objetivo**: Validar que el sistema permita la creación de cuentas bancarias correctamente.
* **Precondiciones**
    - Es opcional tener clientes registrados previamente.
        - Si no hay clientes registrados previamente se crean en ese momento de forma automática.
        - Si ya existen clientes registrados únicamente se obtienen los datos necesarios para completar el formulario.
* **Entradas**
    * Datos del cliente
    * Tipo de cuenta
    * Tipo de moneda
    * Monto inicial
* **Escenarios**
    * Crear una cuenta bancaria monetaria en quetzales.
        ![PA-03](./PA-03/1.png)
        ![PA-03](./PA-03/2.png)
    * Crear una cuenta bancaria de ahorro en dólares.
        ![PA-03](./PA-03/3.png)
        ![PA-03](./PA-03/4.png)
    * Intentar crear una cuenta con datos incompletos.
        ![PA-03](./PA-03/5.png)
* **Resultados**
    * Las cuentas fueron creadas exitosamente cuando se ingresaron los datos correspondientes con sus respectivas validaciones.
    * Mensajes de alerta claros cuando alguno de los campos obligatorios permaneció vacío.

## PA-04. Creación de Tarjetas (Módulo Atención al Cliente)
* **Objetivo**: Validar que el sistema permita a los usuarios crear una nueva tarjeta correctamente, almacenando los datos ingresados y mostrando un mensaje de confirmación al finalizar.
* **Precondiciones**
    - El usuario debe estar autenticado en el sistema.
    - El usuario debe tener rol de atención al cliente para crear una tarjeta.
* **Entradas**
    * Tipo de tarjeta (crédito o débito)
    * Límite de crédito (si aplica)
    * CUI del titular (si aplica)
    * Número de cuenta (si aplica)
* **Escenarios**
    * Crear una tarjeta de crédito.
        - Formulario.
            ![PA-04](./PA-04/1.png)
        - Confirmación.
            ![PA-04](./PA-04/2.png)
        - Mensaje exitoso.
            ![PA-04](./PA-04/3.png)
    * Crear una tarjeta de débito.
        - Formulario.
            ![PA-04](./PA-04/4.png)
        - Confirmación.
            ![PA-04](./PA-04/5.png)
        - Mensaje exitoso.
            ![PA-04](./PA-04/6.png)
    * Intentar crear una tarjeta cuando el cliente tiene aún una solicitud vigente.
        ![PA-04](./PA-04/7.png)
    * Intentar crear una tarjeta con datos incompletos.
        ![PA-04](./PA-04/8.png)
* **Resultados**
    * Las solicitudes de creación de tarjetas se enviaron correctamente al llenar el formulario de la forma debida.
    * Mensajes de alerta claros cuando alguno de los campos permaneció vacío o hay una solicitud vigente
# Pruebas de Aceptación - Proyecto - Grupo 7

## PA-01. Inicio de Sesión
* **Objetivo**: Verificar que los usuarios pueden iniciar sesión correctamente y que se validan las credenciales.
* **Precondiciones**: Tener usuarios registrados con credenciales válidas.
* **Entradas**: Correo electrónico, contraseña, nombre de usuario.
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
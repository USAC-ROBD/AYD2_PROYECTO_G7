import { Administrador } from "../models/Administrador.mjs";

class UsuarioFactory {
    static crearUsuario(tipo, id_usuario, usuario, cui, nombre, apellido, telefono, correo, params) {
        switch (tipo) {
            // case 'cliente':
            //     return new Cliente();
            // case 'supervisor':
            //     return new Supervisor();
            case 'admin':
                console.log(params);
                return new Administrador(
                    id_usuario,
                    usuario,
                    nombre, 
                    apellido,
                    telefono,
                    correo,
                    cui,
                    params.edad,  
                    params.genero, 
                    params.estado_civil, 
                    params.papeleria, 
                    params.foto,
                );
            default:
                return null;
        }
    }
}

export { UsuarioFactory };
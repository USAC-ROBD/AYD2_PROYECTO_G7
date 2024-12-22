import { Administrador } from "../models/Administrador.mjs";

class UsuarioFactory {
    static crearUsuario(tipo, cui, nombre, apellido, telefono, correo, params) {
        switch (tipo) {
            // case 'cliente':
            //     return new Cliente();
            // case 'supervisor':
            //     return new Supervisor();
            case 'admin':
                return new Administrador(
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
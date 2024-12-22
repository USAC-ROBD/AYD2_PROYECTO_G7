import bcrypt from "bcrypt";
import db from "../utils/db_connection.mjs";

class Administrador {
    constructor(nombre, apellido, telefono, correo, cui, edad, genero, estado_civil, papeleria, foto) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.cui = cui;
        this.edad = edad;
        this.genero = genero;
        this.estado_civil = estado_civil;
        this.papeleria = papeleria;
        this.foto = foto;
        this.id_usuario = null;
        this.usuario = null;
        this.contrasena = null;
        this.estado = null;
        this.creacion = null;
        this.crea = null;
        this.id_rol = 1;
    }

    async registrar() {
        //Verificar correo
        const [rows] = await db.query(
            `SELECT ID_USUARIO FROM USUARIO WHERE CORREO = ?`,
            [this.correo]
        );

        if (rows.length > 0) {
            throw new Error("El correo ya está registrado");
        }

        //Generar usuario y verificar que no exista
        let usuario = this.nombre.toLowerCase()[0] + this.apellido.toLowerCase().split(" ")[0];
        let numero = 1;
        while (await this.usuarioExiste(usuario)) {
            usuario = this.nombre.toLowerCase()[0] + this.apellido.toLowerCase().split(" ")[0] + numero;
            numero++;
        }

        //Generar contraseña
        const contrasena = this.generarContrasena();
        const hash = await bcrypt.hash(contrasena, 10);

        //Insertar usuario
        try {
            const [result] = await db.query(
                `INSERT INTO USUARIO (USUARIO, CONTRASENA, NOMBRE, APELLIDO, TELEFONO, CORREO, EDAD, CUI, GENERO, ESTADO_CIVIL, PAPELERIA, FOTO, ESTADO, ID_ROL)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [usuario, hash, this.nombre, this.apellido, this.telefono, this.correo, this.edad, this.cui, this.genero, this.estado_civil, this.papeleria, this.foto, 'P', this.id_rol]
            );

            this.id_usuario = result.insertId;
            this.usuario = usuario;
            this.contrasena = contrasena;
            this.estado = 'P';
            
            return this.id_usuario;
        } catch (error) {
            console.error("Error en registrarAdministrador:", error.message);
            return null;
        }
    }

    async usuarioExiste(usuario) {
        const [rows] = await db.query(
            `SELECT ID_USUARIO FROM USUARIO WHERE USUARIO = ?`,
            [usuario]
        );

        return rows.length > 0;
    }

    generarContrasena(longitud = 16) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numeros = "0123456789";
        const especiales = "!@#$%^&*()_+";
        let contrasena = "";

        for (let i = 0; i < longitud; i++) {
            const tipo = Math.floor(Math.random() * 3);
            switch (tipo) {
                case 0:
                    contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                    break;
                case 1:
                    contrasena += numeros.charAt(Math.floor(Math.random() * numeros.length));
                    break;
                case 2:
                    contrasena += especiales.charAt(Math.floor(Math.random() * especiales.length));
                    break;
            }
        }
        return contrasena;
    }

    getUsuario() {
        return this.usuario;
    }
    getContrasena() {
        return this.contrasena;
    }
    getNombre() {
        return this.nombre;
    }
    getApellido() {
        return this.apellido;
    }
    getTelefono() {
        return this.telefono;
    }
    getCorreo() {
        return this.correo;
    }
    getEdad() {
        return this.edad;
    }
    getCui() {
        return this.cui;
    }
    getGenero() {
        return this.genero;
    }
    getEstadoCivil() {
        return this.estado_civil;
    }
    getPapeleria() {
        return this.papeleria;
    }
    getFoto() {
        return this.foto;
    }
    getEstado() {
        return this.estado;
    }
    getIdRol() {
        return this.id_rol;
    }
    getCreacion() {
        return this.creacion;
    }
    getCrea() {
        return this.crea;
    }

    setUsuario(usuario) {
        this.usuario = usuario;
    }
    setContrasena(contrasena) {
        this.contrasena = contrasena;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setApellido(apellido) {
        this.apellido = apellido;
    }
    setTelefono(telefono) {
        this.telefono = telefono;
    }
    setCorreo(correo) {
        this.correo = correo;
    }
    setEdad(edad) {
        this.edad = edad;
    }
    setCui(cui) {
        this.cui = cui;
    }
    setGenero(genero) {
        this.genero = genero;
    }
    setEstadoCivil(estado_civil) {
        this.estado_civil = estado_civil;
    }
    setPapeleria(papeleria) {
        this.papeleria = papeleria;
    }
    setFoto(foto) {
        this.foto = foto;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    setIdRol(id_rol) {
        this.id_rol = id_rol;
    }
    setCreacion(creacion) {
        this.creacion = creacion;
    }
    setCrea(crea) {
        this.crea = crea;
    }
}

export { Administrador };
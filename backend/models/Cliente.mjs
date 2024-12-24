import bcrypt from "bcrypt";
import db from "../utils/db_connection.mjs";

class Cliente {
    constructor(cui, nombre, apellido, direccion, telefono, correo, pregunta, respuesta, values, query) {
        this.cui = cui;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.values = values;
        this.query = query;
        this.creacion = null;
        this.crea = null;
        this.actualizacion = null;
        this.actualiza = null;
    }

    async registrar() {
        await db.query(
            `INSERT INTO CLIENTE(CUI, NOMBRE, APELLIDO, TELEFONO, EMAIL, DIRECCION, PREGUNTA, RESPUESTA) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [this.cui, this.nombre, this.apellido, this.telefono, this.correo, this.direccion, this.pregunta, this.respuesta]
        );
    }

    async actualizar() {
        await db.query(`UPDATE CLIENTE SET ${this.query} WHERE CUI = ?;`, this.values);
    }

    getCui() {
        return this.cui;
    }
    getNombre() {
        return this.nombre;
    }
    getApellido() {
        return this.apellido;
    }
    getDireccion() {
        return this.direccion;
    }
    getTelefono() {
        return this.telefono;
    }
    getCorreo() {
        return this.correo;
    }
    getPregunta() {
        return this.pregunta;
    }
    getRespuesta() {
        return this.respuesta;
    }
    getCreacion() {
        return this.creacion;
    }
    getCrea() {
        return this.crea;
    }
    getActualizacion() {
        return this.actualizacion;
    }
    getActualiza() {
        return this.actualiza;
    }

    setCui(cui) {
        this.cui = cui;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setApellido(apellido) {
        this.apellido = apellido;
    }
    setDireccion(direccion) {
        this.direccion = direccion;
    }
    setTelefono(telefono) {
        this.telefono = telefono;
    }
    setCorreo(correo) {
        this.correo = correo;
    }
    setPregunta(pregunta) {
        this.pregunta = pregunta;
    }
    setRespuesta(respuesta) {
        this.respuesta = respuesta;
    }
    setCreacion(creacion) {
        this.creacion = creacion;
    }
    setCrea(crea) {
        this.crea = crea;
    }
    setActualizacion(actualizacion) {
        this.actualizacion = actualizacion;
    }
    setActualiza(actualiza) {
        this.actualiza = actualiza;
    }
}

export { Cliente };
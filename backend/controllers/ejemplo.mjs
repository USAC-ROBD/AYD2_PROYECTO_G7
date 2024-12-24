// Propósito: Controlador de ejemplo para mostrar el funcionamiento de la API
import configurations from "../utils/configurations.mjs";
import db from "../utils/db_connection.mjs";
import nodemailer from 'nodemailer';

const ejemplo = (req, res) => {
    return res.status(200).json({ "status": 200, "message": "API Funcionando correctamente " + configurations.host + ":" + configurations.port });
}

const test_db = async (req, res) => {
    const [rows, fields] = await db.query(`SELECT 'DB Funcionando correctamente' as message`);
    res.status(200).json({ "status": 200, "message": "Test de la base de datos", "data": rows });
}

const deposito_efectivo = async (req, res) => {
    const data = req.body;

    const {destinoCuenta, origenCuenta, paymentMethod, montoDepositar, crea} = data;
    
    try{
        const [rowsDestino] = await db.query(`SELECT id_cuenta FROM cuenta WHERE numero = ?`, [destinoCuenta]);

        // Validación de que la cuenta destino existe
        if (rowsDestino.length === 0) {
            return res.status(404).json({
                "status": 404,
                "message": "Cuenta destino no encontrada",
            });
        }

        const id_destino = rowsDestino[0].id_cuenta;
        const monto =  parseFloat(montoDepositar).toFixed(2);
        const metodo = paymentMethod[0]

        console.log(destinoCuenta,' ',origenCuenta,' ',metodo,' ',monto,' ', crea,'')
        const [rows, fields] = await db.query(
            `INSERT INTO deposito  (ID_CUENTA, ID_CUENTA_ORIGEN, TIPO, MONTO, CREA) 
             VALUES (?, ?, ?, ?, ?)`,
            [id_destino, null, metodo, monto, crea]
        );

        return res.status(200).json({ "status": 200, "message": "deposito realizado con exito"});
    }catch (error) {
        return res.status(500).json({ "status": 500, "message": "error al tratar de hacer el deposito"});
    }
}

const deposito_transferencia = async (req, res) => {
    const data = req.body;

    const {origenCuenta, destinoCuenta, paymentMethod, montoDepositar, crea} = data;
    const metodo = paymentMethod[0]

    try{
        const [rowsDestino, fieldsDestino] = await db.query(`SELECT id_cuenta FROM cuenta WHERE numero = ?`, [destinoCuenta]);

        const [rowsOrigen, fieldsOrigen] = await db.query(`SELECT id_cuenta FROM cuenta WHERE numero = ?`, [origenCuenta]);

        const [rowsSuficiente, fieldsSuficiente] = await db.query(`SELECT saldo FROM cuenta WHERE numero = ?`, [origenCuenta]);
        

        // Validación de que la cuenta destino existe
        if (rowsDestino.length === 0 && rowsOrigen.length === 0) {
            return res.status(404).json({
                "status": 404,
                "message": "Cuenta destino o de origen no encontrada",
            });
        }

        const id_destino = rowsDestino[0].id_cuenta;
        const id_origen = rowsOrigen[0].id_cuenta;
        const monto =  parseFloat(montoDepositar).toFixed(2);

        const saldo_suficiente = rowsSuficiente[0].saldo;

        if(saldo_suficiente <= monto){
            return res.status(422).json({
                "status": 422,
                "message": "Fondos unsificientes del la cuenta origen",
            });
        }

        const [rows, fields] = await db.query(
            `INSERT INTO deposito (ID_CUENTA, ID_CUENTA_ORIGEN, TIPO, MONTO, CREA) 
             VALUES (?, ?, ?, ?, ?)`,
            [id_destino, id_origen, metodo, monto, crea]
        );

        return res.status(200).json({ "status": 200, "message": "deposito realizado con exito"});
    }catch (error) {
        return res.status(500).json({ "status": 500, "message": "error al tratar de hacer el deposito"});
    }
}

const retirar_dinero = async (req, res) => {
    const data = req.body;
    const {origenCuenta, returnMethod, montoRetirar, crea, token} = data;
    const metodo = returnMethod[0]

    console.log(token)

    if(token === 'Rpd8n'){
        try{

            const [rowsOrigen, fieldsOrigen] = await db.query(`SELECT id_cuenta FROM cuenta WHERE numero = ?`, [origenCuenta]);
    
            const [rowsSuficiente, fieldsSuficiente] = await db.query(`SELECT saldo FROM cuenta WHERE numero = ?`, [origenCuenta]);
            
    
            // Validación de que la cuenta destino existe
            if (rowsOrigen.length === 0) {
                return res.status(404).json({
                    "status": 404,
                    "message": "Cuenta origen no encontrada",
                });
            }
    
            const id_origen = rowsOrigen[0].id_cuenta;
            const monto =  parseFloat(montoRetirar).toFixed(2);
    
            const saldo_suficiente = rowsSuficiente[0].saldo;
    
            if(saldo_suficiente <= monto){
                return res.status(422).json({
                    "status": 422,
                    "message": "Fondos insuficientes del la cuenta origen",
                });
            }
    
            const [rows, fields] = await db.query(
                `INSERT INTO retiro (ID_CUENTA, TIPO, MONTO, CREA) 
                 VALUES (?, ?, ?, ?)`,
                [id_origen, metodo, monto, crea]
            );
    
            return res.status(200).json({ "status": 200, "message": "retiro realizado con exito"});
        }catch (error) {
            return res.status(500).json({ "status": 500, "message": "error al tratar de hacer el retiro"});
        }
    }else{
        return res.status(500).json({ "status": 500, "message": "error el token ingresado no es el  correcto"});
    }
}

const generar_token = async (req, res) => {
    const data = req.body;
    const {origenCuenta} = data;

    console.log(origenCuenta)
    
    const [rowsOrigen, fieldsOrigen] = await 
    db.query(`SELECT 
        c.ID_CUENTA, 
        c.NUMERO, 
        cl.EMAIL
        FROM 
        cuenta c
        JOIN 
        cliente cl ON c.CUI = cl.CUI
        WHERE 
        c.NUMERO = ?`, [origenCuenta]);
    
    // Validación de que la cuenta destino existe
    if (rowsOrigen.length === 0) {
        return res.status(404).json({
            "status": 404,
            "message": "Cuenta origen no encontrada",
        });
    }

    const email = rowsOrigen[0].EMAIL;
    const token = generarToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'juanpablogonzalez017@gmail.com',
          pass: 'xzvu svpw dswo otfw'
        }
      });

      const mailOptions = {
        from: 'juanpablogonzalez017@gmail.com',
        to: email, 
        subject: 'Token para retiro de dinero', 
        text: `Se ha generado un token porfavor no comparta el siguiente token con nadie e ingreselo en  el cajero automatico o muestreselo a personal autorizado: ${token}`, 
      };
      
      // Enviar el correo
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ "status": 500, "message": "Error con el correo electronico del cliente"});
        } else {
            return res.status(200).json({ "status": 200, "message": "Token enviado con exito"});
        }
      });
}

function generarToken() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        token += caracteres[randomIndex];
    }
    return token;
}

export const test = {ejemplo, test_db, deposito_efectivo, deposito_transferencia, retirar_dinero, generar_token};
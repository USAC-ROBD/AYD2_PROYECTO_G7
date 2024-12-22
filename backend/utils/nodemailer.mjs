import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_ORIGIN,
        pass: process.env.APP_KEY
    }
})

export const confirmationAccountMail = (usuario, link) => {
    return {
        from: process.env.EMAIL_ORIGIN,
        to: usuario.getCorreo(),
        subject: 'Confirmacion de cuenta',
        html: `<h3>Hola ${usuario.getNombre()},</h3>
            <p>Se ha creado una cuenta para ti en nuestra plataforma con los siguientes datos:</p>
            <p>Usuario: ${usuario.getUsuario()}</p>
            <p>Nombre: ${usuario.nombre} ${usuario.getApellido()}</p>
            <p>Correo: ${usuario.getCorreo()}</p>
            <p>Contraseña: ${usuario.getContrasena()}</p>

            <p>Por favor confirma tu cuenta haciendo click en el siguiente enlace para que puedas iniciar sesión:</p>
            <a href="${link}">Confirmar cuenta</a>`
    }
}
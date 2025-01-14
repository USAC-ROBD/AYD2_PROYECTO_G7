import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_ORIGIN,
        pass: process.env.APP_KEY
    }
})

const confirmationAccountMail = (usuario, link) => {
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

const updateAccountMail = (usuario) => {
    return {
        from: process.env.EMAIL_ORIGIN,
        to: usuario.getCorreo(),
        subject: 'Actualizacion de cuenta',
        html: `<h3>Hola ${usuario.getNombre()},</h3>
            <p>Se ha actualizado tu cuenta en nuestra plataforma con los siguientes datos:</p>
            <p>Usuario: ${usuario.getUsuario()}</p>
            <p>Nombre: ${usuario.nombre} ${usuario.getApellido()}</p>
            ${usuario.getTelefono() ? `<p>Telefono: ${usuario.getTelefono()}</p>` : ''}
            ${usuario.getCorreo() ? `<p>Correo: ${usuario.getCorreo()}</p>` : ''}
            ${usuario.getEdad() ? `<p>Edad: ${usuario.getEdad()}</p>` : ''}
            ${usuario.getCui() ? `<p>CUI: ${usuario.getCui()}</p>` : ''}
            ${usuario.getGenero() ? `<p>Genero: ${usuario.getGenero()}</p>` : ''}
            ${usuario.getEstadoCivil() ? `<p>Estado civil: ${usuario.getEstadoCivil()}</p>` : ''}
            

            <p>Mantente seguro y no compartas tus credenciales con nadie.</p>`
    }
}

const deactiveCard = (usuario, tarjeta) => {
    return {
        from: process.env.EMAIL_ORIGIN,
        to: usuario.correo,
        subject: 'Bloqueo de tarjeta',
        html: `<h3>Hola ${usuario.titular},</h3>
            <p>Se ha bloqueado tu tarjeta ${tarjeta.numero} en nuestra plataforma con el titular:</p>
            <p>Nombre: ${usuario.titular}</p>
            <p>Motivo: ${tarjeta.motivo}</p>


            <p>Mantente seguro y no compartas tus credenciales con nadie.</p>`
    }
}

const credentialsUser = (user, email, pass) =>{
    return {
        from: process.env.EMAIL_ORIGIN ,
        to: email ,
        subject: 'Datos de usuario',
        text: `Este es su usuario y contraseña para poder ingresar al sistema:\nUsuario: ${user}\nContraseña: ${pass}`,
    }
}

const updatePassword = (email, pass) =>{
    return{
        from: process.env.EMAIL_ORIGIN ,
        to: email,
        subject: 'Nueva contraseña',
        text: `Se ha generado una nueva contraseña para su usuario porfabor no la comparta con nadie mas: ${pass}`,
    }
}

const complaint = (email, nombre) => {
    return {
        from: process.env.EMAIL_ORIGIN,
        to: email,
        subject: 'Nuevo registro de queja',
        html: `<h3>Hola, ${nombre},</h3>
            <p>Se ha recibido una nueva queja. Por favor ingresa al módulo de Supervisor para darle seguimiento.</p>`
    }
}

export { transporter, confirmationAccountMail, updateAccountMail, deactiveCard, credentialsUser, updatePassword, complaint}
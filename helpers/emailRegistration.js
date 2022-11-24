const nodemailer = require('nodemailer');

const emailRegistration = async (data) => {
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    //enviar el email
    const { email, name, token } = data;
    console.log(data);
    const info = await transporter.sendMail({
        from: "Administrador de Ingenieria de software",
        to: email,
        subject: "Comprueba tu cuenta en ECM",
        text: "Comprueba tu cuenta en ECM",
        html: `<p>Hola:${name},comprueba tu cuenta en ECM</p>
        <p>Tu cuenta ya esta lista,solo debes comprobarla en el siguiente enlace
        <a href="${process.env.FRONTEND_URL}confirmar/${token}" >Comprobar tu cuenta</a></p>

        <p>Si tu no creaste esta cuenta,puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);
}


module.exports = { emailRegistration }

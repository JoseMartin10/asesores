const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del transporte
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Controlador para enviar correo electrónico
const sendEmail = (req, res) => {
    const { to, subject, text, html } = req.body;

    // Validación básica de entradas
    if (!to || !subject || (!text && !html)) {
        return res.status(400).send('Faltan datos requeridos');
    }

    // Configuración del correo electrónico
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado correctamente');
        }
    });
};

module.exports = {
    sendEmail
};


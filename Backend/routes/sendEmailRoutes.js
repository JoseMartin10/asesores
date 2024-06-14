const express = require('express');
const router = express.Router();
const sendEmailController = require('../controllers/sendEmailController');

// Ruta para enviar correo electrónico
router.post('/send-email', sendEmailController.sendEmail);

module.exports = router;

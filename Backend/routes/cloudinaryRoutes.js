// cloudinaryRoutes.js

const express = require('express');
const router = express.Router();
const cloudinaryController = require('../controllers/cloudinaryController');

router.post('/upload', cloudinaryController.uploadImage);

console.log('Rutas de Cloudinary configuradas');

module.exports = router;
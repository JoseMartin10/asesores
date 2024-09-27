const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

exports.uploadImage = async (req, res) => {
    try {
        console.log('Recibiendo solicitud para subir imagen a Cloudinary');
        
        // Verificar si la solicitud contiene un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No se ha subido ninguna imagen');
            return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
        }
    
        const file = req.files.imagen;
        console.log('Archivo recibido:', file); // Verificar si el archivo llega correctamente al servidor
    
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        console.log('Imagen subida a Cloudinary:', result);
    
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error('Error al subir imagen a Cloudinary:', error);
        res.status(500).json({ message: 'Error al subir imagen' });
    }
};

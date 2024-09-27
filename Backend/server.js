const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinaryRoutes = require('./routes/cloudinaryRoutes');
const sendEmailRoutes = require('./routes/sendEmailRoutes');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/email', sendEmailRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});









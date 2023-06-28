const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); 
      } else {
        cb(new Error('Solo se permiten archivos JPEG y PNG.')); 
      }
    },
  });

app.use(express.static('public')); 

app.post('/upload', upload.array('files'), (req, res) => {
    const fileInfos = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));
    res.send(fileInfos);
  });
  

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
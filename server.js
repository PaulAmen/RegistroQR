const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
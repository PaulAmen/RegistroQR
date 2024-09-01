const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Sirve archivos estáticos desde el directorio actual (raíz)
app.use(express.static(__dirname));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

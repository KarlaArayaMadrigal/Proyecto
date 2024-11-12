const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Rutas
const ventasRoutes = require('./routes/ventasRoutes');
const productosRoutes = require('./routes/productosRoutes');

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Usar las rutas de ventas y productos
app.use('/api/ventas', ventasRoutes);
app.use('/api/productos', productosRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

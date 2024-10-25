import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar el router
import App from './App.tsx';
import Producto from './assets/pages/Producto.tsx';
import Promocion from './assets/pages/Promociones.tsx';
import NuevasPrendas from './assets/pages/NuevasPrendas.tsx';
import Marcas from './assets/pages/Marcas.tsx';
import Carrito from './assets/pages/Carrito.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/producto" element={<Producto />} />
        <Route path="/promociones" element={<Promocion />} />
        <Route path="/nuevas-prendas" element={<NuevasPrendas />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  </StrictMode>
);


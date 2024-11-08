import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Promocion from './assets/pages/Promociones.tsx';
import Marcas from './assets/pages/Marcas.tsx';
import Carrito from './assets/pages/Carrito.tsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Producto from './assets/pages/Productos.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/promociones" element={<Promocion />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/productos" element={<Producto />} />
      </Routes>
    </Router>
  </StrictMode>
);

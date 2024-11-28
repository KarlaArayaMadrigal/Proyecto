import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Carrito from './assets/pages/Carrito.tsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Producto from './assets/pages/Productos.tsx';
import Promocion from './assets/pages/Promociones.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/productos" element={<Producto />} />
        <Route path="/promociones" element={<Promocion />} />
      </Routes>
    </Router>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Carrito from './assets/pages/Carrito.tsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Producto from './assets/pages/Productos.tsx';
import Ventas from './assets/pages/Listas.tsx';
import Inventario from './assets/pages/Inventario.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/productos" element={<Producto />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </Router>
  </StrictMode>
);

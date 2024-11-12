import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>{producto.nombre} - ${producto.precio}</li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px;
  background-color: #f4f4f9;
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
`;

const Cards = styled.div`
  width: 300px;
  height: 450px;
  margin: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductoNombre = styled.h2`
  font-size: 20px;
  color: #333;
  margin-top: 15px;
`;

const Precio = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #e67e22;
`;

const Cantidad = styled.p`
  font-size: 16px;
  color: #555;
`;

const BotonComprar = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4d63;
  }
`;

interface Producto {
  id_inventario: number;
  id_marca: number | null;
  tipo_prenda: string;
  cantidad_disponible: number;
  precio: number;
  imagen_url: string;
}

const ListaProductos = () => {
  const [inventario, setInventario] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('http://localhost/Proyecto-Desarrollo/backend/api.php')
      .then(response => response.json())
      .then(data => setInventario(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleComprar = async (producto: Producto) => {
    const ventaData = {
      id_inventario: producto.id_inventario,
      tipo_prenda: producto.tipo_prenda,
      precio: producto.precio,
      cantidad: 1, // Ajusta esto según la cantidad que desees vender
    };

    try {
      const response = await fetch('http://localhost/Proyecto-Desarrollo/backend/api.php?action=venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaData),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la compra');
      }

      const result = await response.json();
      alert(`Agregado al carrito`);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al realizar la compra.');
    }
  };

  return (
    <Container>
      <Titulo>Todos los productos</Titulo>
      {inventario.map(item => (
        <Cards key={item.id_inventario}>
          <Image src={item.imagen_url} alt={item.tipo_prenda} />
          <ProductoNombre>{item.tipo_prenda}</ProductoNombre>
          <Cantidad>Cantidad disponible: {item.cantidad_disponible}</Cantidad>
          <Precio>Precio: ${item.precio}</Precio>
          <BotonComprar onClick={() => handleComprar(item)}>Comprar</BotonComprar>
        </Cards>
      ))}
    </Container>
  );
};

export default ListaProductos;

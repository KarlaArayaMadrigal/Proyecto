import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas de igual tamaño */
  gap: 20px; /* Espaciado entre los productos */
  padding: 20px;
  background-color: #f4f4f9;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 columna */
  }
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 36px;
  margin: 20px 0;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
`;

const Cards = styled.div`
  width: 100%;
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
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
`;

const ProductoNombre = styled.h2`
  font-size: 20px;
  color: #333;
  margin-top: 15px;
  text-align: center;
`;

const Precio = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #0a2260;
  margin-top: 10px;
`;

const Cantidad = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

const BotonComprar = styled.button`
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#000000")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#2d4d63")};
  }
`;

// Componente MensajeExito con 'visible' correctamente tipado
const MensajeExito = styled.p<{ visible: boolean }>`
  color: #fff;
  background-color: #28a745;
  text-align: center;
  margin-top: -60px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
  margin-left: 830px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out;

  &::before {
    content: "✔"; /* Ícono de éxito */
    margin-right: 10px;
    font-size: 20px;
  }

  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
  const [carrito, setCarrito] = useState<Producto[]>(() => {
    const storedCart = localStorage.getItem('carrito');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [mensaje, setMensaje] = useState<{ texto: string; visible: boolean }>({ texto: '', visible: false });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/Proyecto-Desarrollo/backend/api.php')
      .then((response) => response.json())
      .then((data) => setInventario(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleComprar = useCallback((producto: Producto) => {
    const existeEnCarrito = carrito.some((item) => item.id_inventario === producto.id_inventario);
    if (!existeEnCarrito) {
      setCarrito((prevCarrito) => [...prevCarrito, producto]);
      setMensaje({ texto: `${producto.tipo_prenda} agregado al carrito`, visible: true });
      setTimeout(() => setMensaje({ texto: '', visible: false }), 3000); // Oculta el mensaje después de 3 segundos
    } else {
      setMensaje({ texto: 'El producto ya está en el carrito.', visible: true });
      setTimeout(() => setMensaje({ texto: '', visible: false }), 3000);
    }
  }, [carrito]);

  const irAlCarrito = () => {
    navigate('/carrito', { state: { carrito } });
  };

  return (
    <>
      <Titulo>Todos los productos</Titulo>
      {mensaje.texto && <MensajeExito visible={mensaje.visible}>{mensaje.texto}</MensajeExito>}
      <Container>
        {inventario.map((item) => (
          <Cards key={item.id_inventario}>
            <Image src={item.imagen_url} alt={item.tipo_prenda} />
            <ProductoNombre>{item.tipo_prenda}</ProductoNombre>
            <Cantidad>Cantidad disponible: {item.cantidad_disponible}</Cantidad>
            <Precio>Precio: ₡{item.precio}</Precio>
            <BotonComprar
              onClick={() => handleComprar(item)}
              disabled={item.cantidad_disponible === 0}
            >
              {item.cantidad_disponible === 0 ? 'Sin stock' : 'Comprar'}
            </BotonComprar>
          </Cards>
        ))}
      </Container>
    </>
  );
};

export default ListaProductos;


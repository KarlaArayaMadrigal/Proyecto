import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Estilos del contenedor y tarjetas
const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #f4f4f4; /* Agregar espacio superior */
  padding-top: 40px; /* Añadir espacio para que el título no esté pegado al borde superior */
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
  background-color: #000000;
  width: min-content;
  margin-top: 20px; /* Ajusta si necesitas más espacio en la parte superior */
`;

const Card = styled.div`
  width: 300px;
  height: 420px;
  margin: 15px;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ImagenProducto = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const NombreProducto = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
`;

const DetallesProducto = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const Precio = styled.p`
  font-size: 18px;
  color: #2ecc71;
  font-weight: 600;
`;

const ErrorMensaje = styled.p`
  color: red;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
`;

const BotonComprar = styled.button`
  background-color: #050505;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e1e1e;
  }
`;

const ListaProductos = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCompra = () => {
    alert('Producto comprado!');
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/inventario");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("No se pudieron cargar los productos. Intenta nuevamente más tarde.");
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      {/* Mostrar mensaje de error si existe */}
      {error && <ErrorMensaje>{error}</ErrorMensaje>}

      {/* Título en la parte superior */}
      <Titulo>Todos los productos</Titulo>

      {/* Contenedor de las tarjetas */}
      <Container>
        {productos.map((producto) => (
          <Card key={producto.id_inventario}>
            <ImagenProducto
              src={`http://localhost:5000/images/${producto.imagen}`}
              alt={producto.tipo_prenda}
            />
            <NombreProducto>{producto.tipo_prenda}</NombreProducto>
            <DetallesProducto>{producto.cantidad_disponible} disponibles</DetallesProducto>
            <Precio>Precio: ${producto.precio}</Precio>
            <BotonComprar onClick={handleCompra}>Comprar</BotonComprar>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default ListaProductos;

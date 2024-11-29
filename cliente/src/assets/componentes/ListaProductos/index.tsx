import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px; 
  padding: 20px;
  background-color: #f4f4f9;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
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

const Talla = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

const Marca = styled.p`
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
    content: "✔"; 
    margin-right: 10px;
    font-size: 20px;
  }

  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

interface Producto {
  id_producto: number;
  id_marca: number | null;
  marca: string;
  articulo: string;
  talla: number;
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
  const [tipoBusqueda, setTipoBusqueda] = useState<string>('');
  const navigate = useNavigate();


  const fetchInventario = useCallback(() => {
    let url = 'http://localhost/Proyecto-Desarrollo/backend/index.php/producto';
    if (tipoBusqueda) {
      url += `?tipo_prenda=${tipoBusqueda}`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setInventario(data);
        } else {
          throw new Error('Formato de datos inválido');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMensaje({ texto: 'Error al cargar los productos', visible: true });
        setTimeout(() => setMensaje({ texto: '', visible: false }), 3000);
      });
  }, [tipoBusqueda]);

  useEffect(() => {
    fetchInventario();
  }, [fetchInventario]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleComprar = useCallback((producto: Producto) => {
    const productoEnCarrito = carrito.find((item) => item.id_producto === producto.id_producto);
    if (!productoEnCarrito) {
      setCarrito((prevCarrito) => [...prevCarrito, producto]);
      setMensaje({ texto: `${producto.articulo} agregado al carrito`, visible: true });
    } else if (productoEnCarrito.talla > 0) {
      setMensaje({ texto: 'El producto ya está en el carrito.', visible: true });
    }
    setTimeout(() => setMensaje({ texto: '', visible: false }), 3000);
  }, [carrito]);

  return (
    <>
      <Titulo>Todos los productos</Titulo>

      {mensaje.texto && (
        <MensajeExito visible={mensaje.visible} role="alert" aria-live="assertive">
          {mensaje.texto}
        </MensajeExito>
      )}

      <Container>
        {inventario.map((item) => (
          <Cards key={item.id_producto}>
            <Image src={item.imagen_url} alt={item.articulo} />
            <ProductoNombre>{item.articulo}</ProductoNombre>
            <Marca> Marca: {item.marca}</Marca>
            <Talla>Talla disponible: {item.talla}</Talla>
            <Precio>Precio: ₡{item.precio}</Precio>
            <BotonComprar
              onClick={() => handleComprar(item)}
              disabled={item.talla === 0}
            >
              {item.talla === 0 ? 'Sin stock' : 'Comprar'}
            </BotonComprar>
          </Cards>
        ))}
      </Container>
    </>
  );
};

export default ListaProductos;

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import ModalEditar from '../ModalEditar';
import ModalAgregarProducto from '../ModalAgregaProducto';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f9;
  max-width: 100%;
  margin: 0 auto;
  font-family: "Afacad Flux", sans-serif;

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

const BotonAccion = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4d63;
  }
`;
const BotonAgregar = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: -15px;
  margin-left: 100px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4d63;
  }
`;
interface Producto {
  id_inventario: number;
  id_marca: number | null;
  marca : string;
  tipo_prenda: string;
  talla : string;
  cantidad_disponible: number;
  precio: number;
  imagen_url: string;
}

const ListaInventario = () => {
  const [inventario, setInventario] = useState<Producto[]>([]);
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);


  const handleDelete = (id_inventario: number) => {
    console.log('Eliminar producto con id:', id_inventario);
    setInventario((prevInventario) => prevInventario.filter((item) => item.id_inventario !== id_inventario));
  };

  const fetchInventario = useCallback(() => {
    const url = 'http://localhost/Proyecto-Desarrollo/backend/index.php/inventario';
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
      });
  }, []);

  useEffect(() => {
    fetchInventario();
  }, [fetchInventario]);

  const handleEditar = (producto: Producto) => {
    setProductoEditar(producto);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setProductoEditar(null);
  };

  const handleAbrirModalAgregar = () => {
    setModalAgregarAbierto(true); 
  };

  const handleCerrarModalAgregar = () => {
    setModalAgregarAbierto(false); 
  };

  return (
    <>
      <Titulo>Inventario</Titulo>
      <BotonAgregar onClick={handleAbrirModalAgregar}>Agregar Producto</BotonAgregar>

      {modalAbierto && productoEditar && (
        <ModalEditar
          producto={productoEditar}
          onClose={handleCerrarModal}
          onDelete={() => handleDelete(productoEditar.id_inventario)}
        />
      )}

      {modalAgregarAbierto && (
        <ModalAgregarProducto onClose={handleCerrarModalAgregar} />
      )}

      <Container>
        {inventario.map((item) => (
          <Cards key={item.id_inventario}>
            <Image src={item.imagen_url} alt={item.tipo_prenda} />
            <ProductoNombre>{item.tipo_prenda}</ProductoNombre>
            <Marca>Marca: {item.marca}</Marca>
            <Talla>Talla disponible: {item.talla}</Talla>
            <Cantidad>Cantidad disponible: {item.cantidad_disponible}</Cantidad>
            <Precio>Precio: ₡{item.precio}</Precio>
            <div>
              <BotonAccion onClick={() => handleEditar(item)}>Editar</BotonAccion>
            </div>
          </Cards>
        ))}
      </Container>

    </>
  );
};

export default ListaInventario;


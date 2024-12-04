import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Estilos generales
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #070707;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0d2035;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #555;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #e60000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 15px;

  &:hover {
    background-color: #c10000;
  }
`;

const Message = styled.div<{ error?: boolean }>`
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${(props) => (props.error ? "#ff0000" : "#112767")};
  background-color: ${(props) => (props.error ? "#ffe6e6" : "#e6f2ff")};
`;

// Componente principal
interface Producto {
  id_inventario: number;
  id_marca: number | null;
  tipo_prenda: string;
  marca: string;
  cantidad_disponible: number;
  precio: number;
  imagen_url: string;
}

const ModalEditar = ({
  producto,
  onClose,
  onDelete,
}: {
  producto: Producto;
  onClose: () => void;
  onDelete: () => void;
}) => {
  const [nombre, setNombre] = useState(producto.tipo_prenda);
  const [precio, setPrecio] = useState(producto.precio);
  const [imagen, setImagen] = useState(producto.imagen_url);
  const [marca, setMarca] = useState(producto.marca);
  const [cantidad, setCantidad] = useState(producto.cantidad_disponible);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setNombre(producto.tipo_prenda);
    setPrecio(producto.precio);
    setImagen(producto.imagen_url);
    setMarca(producto.marca);
    setCantidad(producto.cantidad_disponible);
    setMensaje("");
    setError(false);
  }, [producto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (precio < 0 || cantidad < 0) {
      setMensaje("El precio y la cantidad deben ser mayores o iguales a 0");
      setError(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/Proyecto-Desarrollo/backend/index.php/inventario/${producto.id_inventario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo_prenda: nombre,
            marca: marca,
            cantidad_disponible: cantidad,
            precio: precio,
            imagen_url: imagen,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el producto");
      }

      setMensaje("Producto actualizado correctamente");
      setError(false);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setMensaje(
        err instanceof Error
          ? err.message
          : "Error desconocido al actualizar el producto"
      );
      setError(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost/Proyecto-Desarrollo/backend/index.php/inventario/${producto.id_inventario}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }

      setMensaje("Producto eliminado correctamente");
      setError(false);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setMensaje(
        err instanceof Error
          ? err.message
          : "Error desconocido al eliminar el producto"
      );
      setError(true);
    }
  };

  return (
    <Overlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Editar producto</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="nombre">Nombre:</Label>
          <Input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <Label htmlFor="precio">Precio:</Label>
          <Input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            required
          />
          <Label htmlFor="imagen">Imagen:</Label>
          <Input
            type="text"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
          <Label htmlFor="marca">Marca:</Label>
          <Input
            type="text"
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />

          <Label htmlFor="cantidad">Cantidad disponible:</Label>
          <Input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
          <Button type="submit">Guardar cambios</Button>
          <DeleteButton type="button" onClick={handleDelete}>
            Eliminar producto
          </DeleteButton>
        </Form>
        {mensaje && <Message error={error}>{mensaje}</Message>}
      </ModalContent>
    </Overlay>
  );
};

export default ModalEditar;

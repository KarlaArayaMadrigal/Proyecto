import React, { useState } from "react";
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
  id_inventario?: number;
  id_marca?: number | null;
  tipo_prenda: string;
  marca: string ;
  cantidad_disponible: number;
  precio: number;
  imagen_url: string;
}

const ModalAgregarProducto = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState("");
  const [marca, setMarca] = useState("");
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (precio < 0 || cantidad < 0) {
      setMensaje("El precio y la cantidad deben ser mayores o iguales a 0");
      setError(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/Proyecto-Desarrollo/backend/index.php/inventario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo_prenda: nombre,
            talla: talla,
            cantidad_disponible: cantidad,
            precio: precio,
            imagen_url: imagen,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar el producto");
      }

      setMensaje("Producto agregado correctamente");
      setError(false);

      
      setTimeout(() => {
        window.location.reload(); 
      }, 1500);
    } catch (err) {
      setMensaje(
        err instanceof Error ? err.message : "Error desconocido al agregar el producto"
      );
      setError(true);
    }
  };

  return (
    <Overlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Agregar Producto</Title>
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
          <Label htmlFor="talla">Talla disponible:</Label>
          <Input
            type="number"
            id="talla"
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
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
          <Button type="submit">Agregar Producto</Button>
        </Form>
        {mensaje && <Message error={error}>{mensaje}</Message>}
      </ModalContent>
    </Overlay>
  );
};

export default ModalAgregarProducto;



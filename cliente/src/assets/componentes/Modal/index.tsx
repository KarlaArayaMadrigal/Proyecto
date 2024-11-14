import React from "react";
import styled from "styled-components";


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  font-family: 'Afacad Flux', sans-serif;
`;


const Cerrar = styled.img`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
`;
const Nombre = styled.h2`
margin-bottom: 20px;
`;

interface Producto {
  id: number;
  nombre: string;
  precio: string;
  img: string;
}

interface ModalProductoProps {
  producto: Producto | null;
  onClose: () => void;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ producto, onClose }) => {
  if (!producto) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Cerrar src="/src/assets/img/cerrar.png" onClick={onClose} alt="Cerrar" />
        <Nombre>{producto.nombre}</Nombre>
        <img src={producto.img} alt={producto.nombre} style={{ width: "100%", height: "auto", marginBottom: "15px" }} />
        <p>Precio: {producto.precio}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalProducto;





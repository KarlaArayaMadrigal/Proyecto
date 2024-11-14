import React from "react";
import styled from "styled-components";

interface PerfilProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ModalHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-family: "Afacad Flux", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #000000;
  font-family: "Afacad Flux", sans-serif;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #0056b3;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Afacad Flux", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #011831;
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e21515;
  }
`;

const Perfil: React.FC<PerfilProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Registrate</ModalHeader>
        <Form>
          <Input type="text" placeholder="Nombre" required />
          <Input type="email" placeholder="Correo electrónico" required />
          <Input type="password" placeholder="Contraseña" required />
          <Button type="submit">Guardar</Button>
        </Form>
        <CloseIcon
          src="/src/assets/img/cerrar.png" // Verifica la ruta de la imagen aquí
          alt="Cerrar"
          onClick={onClose}
        />
      </ModalContent>
    </ModalOverlay>
  );
};


export default Perfil;

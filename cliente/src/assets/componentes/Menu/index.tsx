import styled from "styled-components";
import SeleccionOpciones from "../Seleccion";

const Lista = styled.ul`
  list-style-type: none; 
  display: flex; 
  gap: 20px;
  align-items: center;
  padding: 0; 
  margin-left: 50px;
`;

const Enlace = styled.a`
  color: black;
  font-family: 'Afacad Flux', sans-serif;
  text-decoration: none; 
  font-size: 16px;
  
  &:hover {
    text-decoration: solid;
  }
`;

const Menu = () => {
  console.log("Menu renderizado");
  return (
    <div>
      <Lista>
        <SeleccionOpciones/>
        <li><Enlace href="#">Promociones</Enlace></li>
        <li><Enlace href="#">Nuevas Prendas</Enlace></li>
        <li><Enlace href="#">Marcas</Enlace></li>
      </Lista>
    </div>
  );
};

export default Menu;

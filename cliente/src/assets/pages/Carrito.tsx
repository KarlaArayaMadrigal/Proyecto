import { createGlobalStyle } from "styled-components";
import Header from "../componentes/Header";
import ListaCarrito from "../componentes/ListaCarrito";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Carrito = () => {
  return (
    <>
      <GlobalStyle />
      <Header/>
      <ListaCarrito/>
      
    </>
  );
};

export default Carrito;

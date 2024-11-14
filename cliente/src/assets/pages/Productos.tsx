import Header from "../componentes/Header";
import ListaProductos from "../componentes/ListaProductos";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Producto = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <ListaProductos/>
    </>
  );
};
export default Producto;

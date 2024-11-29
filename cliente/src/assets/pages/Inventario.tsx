import { createGlobalStyle } from "styled-components";
import Header from "../componentes/Header";
import ListaInventario from "../componentes/ListaInventario";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Inventario = () => {
  return (
    <>
      <GlobalStyle />
      <Header/>
      <ListaInventario/>
      
    </>
  );
};

export default Inventario;

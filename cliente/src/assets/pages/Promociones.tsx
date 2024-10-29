import Carrusel from "../componentes/Carrusel";
import Header from "../componentes/Header";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Promocion = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Carrusel />
    </>
  );
};
export default Promocion;
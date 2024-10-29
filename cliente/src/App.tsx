import Banner from "./assets/componentes/Banner";
import Header from "./assets/componentes/Header";
import NuevosProductos from "./assets/componentes/NuevosProductos";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Banner />
      <NuevosProductos />
    </>
  );
};

export default App;

import MarcaProducto from "../componentes/FooterMarcas";
import Header from "../componentes/Header";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;


const Marcas = () => {
    return (
        <>
        <GlobalStyle/>
        <Header/>
        <MarcaProducto/>
        
        </>
    );
}
export default Marcas;
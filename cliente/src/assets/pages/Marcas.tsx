import MarcaProducto from "../componentes/FooterMarcas";  // Asegúrate de que la ruta sea correcta
import Header from "../componentes/Header";               // Asegúrate de que la ruta sea correcta
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
            <GlobalStyle />
            <Header />
            <MarcaProducto />  {/* Aquí es donde se muestra el pie de página con las marcas */}
        </>
    );
}

export default Marcas;

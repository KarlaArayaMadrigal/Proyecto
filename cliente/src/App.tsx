import { useState } from "react";
import Banner from "./assets/componentes/Banner";
import Header from "./assets/componentes/Header";
import NuevosProductos from "./assets/componentes/NuevosProductos";


 // o .tsx si es TypeScript

import Perfil from "./assets/pages/Perfil"; // Asegúrate de que la ruta sea correcta
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
`;

const App = () => {
  // Estado para el modal de perfil
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para cerrar el modal
  const closePerfilModal = () => setIsModalOpen(false);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Banner />
      <NuevosProductos />
      
      {/* Renderiza el modal de Perfil si `isModalOpen` es true */}
      {isModalOpen && <Perfil isOpen={isModalOpen} onClose={closePerfilModal} />}
    </>
  );
};

export default App;

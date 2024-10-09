import styled from "styled-components";
import Navegacion from "../NavBar";
import Menu from "../Menu";

const Curso = styled.h1`
  display: flex;
  font-size: 15px;
  color: white;
  background-color: black;
  justify-content: center;
  height: 20px;
  align-items: center;
  font-family: 'Afacad Flux', sans-serif;
`;

const Contenido = styled.div`
  display: flex;
  justify-content: space-between; /* Alinea los elementos horizontalmente */
  align-items: center; /* Alinea los elementos verticalmente */
  width: 100%; /* Ocupa todo el ancho disponible */ /* Añade padding para separar los elementos de los bordes */
`;

const Tienda = styled.h2`
  margin: 0;
  font-family: 'Protest Strike', sans-serif;
  font-size: 40px;
  color: black;
  margin-left: 60px;
`;

const Header = () => {
  return (
    <div>
      <Curso>Desarrollo de Plataformas Abiertas</Curso>
      <Contenido>
        <Tienda>LuKa.com</Tienda>
        <Menu />
        <Navegacion />
      </Contenido>
    </div>
  );
};

export default Header;


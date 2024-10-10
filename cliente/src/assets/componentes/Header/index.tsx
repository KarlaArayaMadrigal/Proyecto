import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importa el hook para la navegación
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Tienda = styled.h2`
  margin: 0;
  font-family: 'Protest Strike', sans-serif;
  font-size: 40px;
  color: black;
  margin-left: 60px;
  cursor: pointer; 
`;

const Header = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); 
  };

  return (
    <div>
      <Curso>Desarrollo de Plataformas Abiertas</Curso>
      <Contenido>
        <Tienda onClick={handleRedirect}>LuKa.com</Tienda> {/* Añade el evento onClick */}
        <Menu />
        <Navegacion />
      </Contenido>
    </div>
  );
};

export default Header;



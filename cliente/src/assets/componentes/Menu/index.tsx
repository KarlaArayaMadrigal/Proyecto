import styled from "styled-components";
import SeleccionOpciones from "../Seleccion";
import { Link, useLocation } from "react-router-dom"; // Importa el componente Link y useLocation

const Lista = styled.ul`
  list-style-type: none; 
  display: flex; 
  gap: 20px;
  align-items: center;
  padding: 0; 
  margin-left: 50px;
`;

const Enlace = styled(Link)<{ isSelected: boolean }>` // Añadir prop para el estado seleccionado
  color: black;
  font-family: 'Afacad Flux', sans-serif;
  text-decoration: none; 
  font-size: 16px;
  padding: 5px 10px; // Agrega un poco de padding para el borde

  border: ${({ isSelected }) => (isSelected ? "2px solid black" : "none")}; // Cambia el color y tamaño del borde
  border-radius: 5px; // Opcional, para bordes redondeados

 
`;

const Menu = () => {
  const location = useLocation(); // Obtiene la ubicación actual
  const currentPath = location.pathname; // Obtiene la ruta actual

  return (
    <div>
      <Lista>
        <SeleccionOpciones/>
        <li>
          <Enlace 
            to="/promociones" 
            isSelected={currentPath === "/promociones"} // Verifica si la ruta actual es "/promociones"
          >
            Promociones
          </Enlace>
        </li>
        <li style={{ display: 'flex', flexDirection: 'row' }}> {/* Añade estilo en línea para que sea horizontal */}
          <Enlace 
            to="/nuevas-prendas" 
            isSelected={currentPath === "/nuevas-prendas"} // Verifica si la ruta actual es "/nuevas-prendas"
          >
            Nuevas Prendas
          </Enlace>
        </li>
        <li>
          <Enlace 
            to="/marcas" 
            isSelected={currentPath === "/marcas"} // Verifica si la ruta actual es "/marcas"
          >
            Marcas
          </Enlace>
        </li>
      </Lista>
    </div>
  );
};

export default Menu;

import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

// Define el tipo de las props que usará el componente Enlace
interface EnlaceProps {
  isSelected: boolean;
}

// Componente Enlace estilizado que extiende Link
const Enlace = styled(({ isSelected, ...props }: EnlaceProps & React.ComponentProps<typeof Link>) => (
  <Link {...props} />
))`
  color: black;
  font-family: "Afacad Flux", sans-serif;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  border: ${({ isSelected }) => (isSelected ? "2px solid black" : "none")};
  border-radius: 5px;
`;

const Lista = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 0;
  margin-left: 50px;
`;

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <Lista>
        <li>
          <Enlace to="/productos" isSelected={currentPath === "/productos"}>
            Productos
          </Enlace>
        </li>
        <li>
          <Enlace to="/promociones" isSelected={currentPath === "/promociones"}>
            Promos
          </Enlace>
        </li>
      </Lista>
    </div>
  );
};

export default Menu;
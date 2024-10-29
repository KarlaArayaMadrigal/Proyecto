import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Lista = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 0;
  margin-left: 50px;
`;

const Enlace = styled(Link)<{ isSelected: boolean }>`
  color: black;
  font-family: "Afacad Flux", sans-serif;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;

  border: ${({ isSelected }) => (isSelected ? "2px solid black" : "none")};
  border-radius: 5px;
`;

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <Lista>
        <li>
          <Enlace to="/promociones" isSelected={currentPath === "/promociones"}>
            Promociones
          </Enlace>
        </li>
        <li>
          <Enlace to="/marcas" isSelected={currentPath === "/marcas"}>
            Marcas
          </Enlace>
        </li>
      </Lista>
    </div>
  );
};

export default Menu;

import styled from "styled-components";

const Lista = styled.ul`
  list-style-type: none; 
  display: flex; 
  gap: 20px;
  align-items: center;
  padding: 0; 
  margin-left: 60px;
`;

const ListaOpciones = styled.li`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Seleccion = styled.select`
  border: none;
  font-family: sans-serif;
  background-color: transparent;
  color: black;
  cursor: pointer;
  padding: 5px;
  width: 75px;
  font-size: 13px;
`;

const Enlace = styled.a`
  color: black;
  font-family: sans-serif;
  text-decoration: none; /* Elimina el subrayado */
  font-size: 13px;
  
  &:hover {
    text-decoration: underline; /* Opcional: subrayado al pasar el cursor */
  }
`;

const Menu = () => {
  return (
    <div>
      <Lista>
        <ListaOpciones>
          <Seleccion id="tienda-options">
            <option value="" disabled selected>
              Tienda
            </option>
            <option value="ropa">Ropa</option>
            <option value="zapatos">Zapatos</option>
            <option value="accesorios">Accesorios</option>
          </Seleccion>
        </ListaOpciones>
        <li><Enlace href="#">Promociones</Enlace></li>
        <li><Enlace href="#">Nuevas Prendas</Enlace></li>
        <li><Enlace href="#">Marcas</Enlace></li>
      </Lista>
    </div>
  );
};

export default Menu;

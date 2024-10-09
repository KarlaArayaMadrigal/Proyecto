import styled from "styled-components";

// Contenedor del form y los íconos
const Contenido = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// Contenedor del input con posicionamiento relativo
const InputContainer = styled.div`
  position: relative;
  width: 380px;
  margin-left: 60px;
`;

// Estilos del input
const Input = styled.input`
  padding: 8px 16px 8px 40px;
  border-radius: 62px;
  width: 100%;
  border: none;
  background-color: #f0f0f0;
  font-size: 16px;
`;

// Estilos para el ícono de la lupa dentro del input
const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  fill: gray;
`;

// Estilos para el contenedor de los íconos de carrito y perfil
const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-left: 20px;
  margin-left: 70px;
`;

// Estilos para los íconos de carrito y perfil
const Icon = styled.svg`
  width: 24px;
  height: 24px;
  fill: black;
  cursor: pointer;
`;

const Navegacion = () => {
  return (
    <Contenido>
      <form>
        <InputContainer>
          <Input type="text" placeholder="Buscar..." />
          <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M10 2a8 8 0 105.3 14.3l4.7 4.7a1 1 0 001.4-1.4l-4.7-4.7A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
            />
          </SearchIcon>
        </InputContainer>
      </form>

      {/* Contenedor para los íconos del carrito y perfil */}
      <IconContainer>
        {/* Ícono de carrito */}
        <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7 18c-1.104 0-1.99.896-1.99 2S5.896 22 7 22s2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-1.99.896-1.99 2S15.896 22 17 22s2-.896 2-2-.896-2-2-2zM7.938 16l1.362-5.446 8.445-.002-1.69 6.746H7.938zM6.82 9l-.57 2.282L4 7h16l-3.444 9.746H8.362l-.58 2.002H19V19H5V17h1.82z" />
        </Icon>

        {/* Ícono de perfil */}
        <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10A5 5 0 0112 4zm0 12c-3.315 0-8 1.674-8 5v1h16v-1c0-3.326-4.685-5-8-5z" />
        </Icon>
      </IconContainer>
    </Contenido>
  );
};

export default Navegacion;

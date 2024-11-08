import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  font-family: "Afacad Flux", sans-serif;
`;

const Cards = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px;
`;
const ListaProductos = () => {
  return (
    <>
      <Container>
        <Titulo>Todos los productos</Titulo>
        <Cards />
      </Container>
    </>
  );
};
export default ListaProductos;

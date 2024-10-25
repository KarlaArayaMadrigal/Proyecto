import styled from "styled-components";

const Prueba = styled.div`
  background-color: #f0eeed;
  color: black;
  padding: 20px;
  width: 200px;
  height: 200px;
  margin: 20px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Esto asegura que la imagen no sobresalga del contenedor */
  
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  padding: 5px;
`;

const Titulo = styled.h1`
  padding: 5px;
  width: 200px;
  font-size: 20px;
  font-family: "Afacad Flux", sans-serif;
  color: black;
  text-align: start;
  margin-top: -5px;
  margin-right: 30px;
`;

const Calificacion = styled.img`
  align-items: start;
  display: flex;
  margin-right: 130px;
`;

const ImagenProducto = styled.img`
  max-width: 100%;  
  max-height: 100%; 
  object-fit: cover;
`;
const Precio = styled.h2`
font-size: 20px;
text-align: start;
margin-right: 190px;
font-family: "Afacad Flux", sans-serif;
`;

const Cards = () => {
  return (
    <Container>
      <CardWrapper>
        <Prueba>
          <ImagenProducto
            src="/src/assets/img/Productos/camisa1.png"
            alt="Producto 1"
          />
        </Prueba>
        <Titulo>Camisa con detalle</Titulo>
        <Calificacion src="/src/assets/img/calificacion.png" alt="calificación" />
        <Precio> $120</Precio>
      </CardWrapper>

      <CardWrapper>
        <Prueba>
          <ImagenProducto
            src="/src/assets/img/Productos/pantalon1.png"
            alt="Producto 2"
          />
        </Prueba>
        <Titulo>Pantalón de mezclilla</Titulo>
        <Calificacion src="/src/assets/img/calificacion.png" alt="calificación" />
        <Precio> $240</Precio>
      </CardWrapper>

      <CardWrapper>
        <Prueba>
          <ImagenProducto
            src="/src/assets/img/Productos/camisa2.png"
            alt="Producto 3"
          />
        </Prueba>
        <Titulo>Camisa de cuadros</Titulo>
        <Calificacion src="/src/assets/img/calificacion.png" alt="calificación" />
        <Precio> $180</Precio>
      </CardWrapper>

      <CardWrapper>
        <Prueba>
          <ImagenProducto
            src="/src/assets/img/Productos/camisa3.png"
            alt="Producto 4"
          />
        </Prueba>
        <Titulo>Camisa de rayas</Titulo>
        <Calificacion src="/src/assets/img/calificacion.png" alt="calificación" />
        <Precio> $130</Precio>
      </CardWrapper>
    </Container>
  );
};

export default Cards;

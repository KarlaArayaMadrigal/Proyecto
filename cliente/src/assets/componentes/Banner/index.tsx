import styled from "styled-components";

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Imagen = styled.img`
  width: 100%;
  height: min-content;
  margin-bottom: 20px;
`;

const Informacion = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: -550px;
  margin-left: 60px;
`;

const Titulo = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`;

const Descripcion = styled.p`
  font-size: 18px;
  color: #666;
`;
const Footer = styled.footer`
  background-color: #a32222;
  max-height: max-content;
  text-align: center;
  color: #333;
  font-size: 14px;
  margin-top: 373px;
`;

const Banner = () => {
  return (
    <Contenido>
      <Imagen src="/src/assets/img/Rectangle 2.png" alt="Banner Image" />
      <Informacion>
        <Titulo>Amazon Web Services</Titulo>
        <Descripcion>
          La plataforma de eCommerce más grande y popular del mundo.
        </Descripcion>
      </Informacion>
      <Footer>Hola</Footer>
    </Contenido>
  );
};

export default Banner;

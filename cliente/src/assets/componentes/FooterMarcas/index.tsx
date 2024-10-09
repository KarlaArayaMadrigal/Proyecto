import styled from "styled-components";

const Footer = styled.footer`
  background-color: black;
  height: 70px; /* Altura del footer */
  text-align: center;
  width: 100%;
  color: white;
  font-size: 14px;
  display: flex; /* Usar flexbox para alinear los elementos */
  justify-content: center; /* Centrar elementos horizontalmente */
  align-items: center; /* Centrar elementos verticalmente */
  gap: 20px; /* Espacio entre las imágenes */
`;

const FooterImage = styled.img`
  height: 70px; /* Altura fija para todas las imágenes */
  width: 70px; /* Ancho fijo para todas las imágenes */
  object-fit: contain; /* Mantiene la proporción de la imagen sin distorsionarla */
  padding: 40px;
`;

const Marcas = () => {
  return (
    <Footer>
      <FooterImage src="/src/assets/img/nike.png" alt="Nike" />
      <FooterImage src="/src/assets/img/adidas.png" alt="Adidas" />
      <FooterImage src="/src/assets/img/puma.png" alt="Puma" />
      <FooterImage src="/src/assets/img/levis.png" alt="Levis" />
      <FooterImage src="/src/assets/img/fila.png" alt="Fila" />
      <FooterImage src="/src/assets/img/gucci.png" alt="Gucci" />
    </Footer>
  );
};

export default Marcas;

import styled from "styled-components";

const Footer = styled.footer`
  background-color: black;
  height: 70px;
  text-align: center;
  width: 100%;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const FooterImage = styled.img`
  display: block !important;
  height: 70px !important;
  width: 70px !important;
  object-fit: contain !important;
  gap: 30px;
`;

const MarcaProducto = () => {
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

export default MarcaProducto;

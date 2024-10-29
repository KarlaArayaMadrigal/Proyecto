import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ModalProducto from "../Modal";

interface Producto {
    id: number;
    nombre: string;
    precio: string;
    img: string;
}

const Container = styled.div`
  background-color: #fefefe;
  margin-top: 50px;
`;

const Muestra = styled.div`
  background-color: #f0eeed;
  color: black;
  padding: 20px;
  width: 250px;
  height: 250px;
  margin: 10px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px;
  padding: 15px;
`;

const Titulo = styled.h1`
  padding: 5px;
  width: 250px;
  font-size: 20px;
  font-family: "Afacad Flux", sans-serif;
  color: black;
  text-align: start;
  margin-top: -5px;
`;

const Calificacion = styled.img`
  align-items: start;
  display: flex;
  margin-right: 150px;
`;

const ImagenProducto = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Precio = styled.h2`
  font-size: 20px;
  text-align: start;
  width: 250px;
  font-family: "Afacad Flux", sans-serif;
`;

const Carrusel: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const abrirModal = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setProductoSeleccionado(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const productos: Producto[] = [
    { id: 1, nombre: "Camisa con detalle", precio: "$120", img: "/src/assets/img/Productos/camisa1.png" },
    { id: 2, nombre: "Pantalón de mezclilla", precio: "$240", img: "/src/assets/img/Productos/pantalon1.png" },
    { id: 3, nombre: "Camisa de cuadros", precio: "$180", img: "/src/assets/img/Productos/camisa2.png" },
    { id: 4, nombre: "Camisa de rayas", precio: "$130", img: "/src/assets/img/Productos/camisa3.png" },
  ];

  return (
    <Container>
      <Slider {...settings}>
        {productos.map((producto) => (
          <CardWrapper key={producto.id}>
            <Muestra onClick={() => abrirModal(producto)}>
              <ImagenProducto src={producto.img} alt={producto.nombre} />
            </Muestra>
            <Titulo>{producto.nombre}</Titulo>
            <Calificacion src="/src/assets/img/calificacion.png" alt="calificación" />
            <Precio>{producto.precio}</Precio>
          </CardWrapper>
        ))}
      </Slider>

      {modalOpen && (
        <ModalProducto
          producto={productoSeleccionado}
          onClose={cerrarModal}
        />
      )}
    </Container>
  );
};

export default Carrusel;

import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import Marcas from "../FooterMarcas";

const Contenido = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; /* Asegura que otros elementos puedan estar encima */
`;

const Imagen = styled.img`
  width: 100%;
  height: auto; /* Asegura que la imagen se mantenga proporcional */
`;

const Informacion = styled.div`
  position: absolute;
  top: 50%; /* Lo movemos más arriba */
  left: 30%; /* Lo movemos más hacia la izquierda */
  transform: translate(-50%, -50%);
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  margin-top: -150px;
  margin-left: 0px; /* Redujimos el margen izquierdo */
  text-align: left;
  z-index: 2; /* Asegura que el contenido esté sobre la imagen */
`;

const Titulo = styled.h1`
  font-size: 48px;
  font-style: normal;
  margin-bottom: 10px;
  margin-top: 100px;
  color: black;
  font-family: "Rubik", sans-serif;
  text-align: left;
`;

const Descripcion = styled.p`
  font-size: 18px;
  font-family: "Afacad Flux", sans-serif;
  text-align: left;
  width: 550px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 62px;
  font-size: 18px;
  height: 55px;
  margin-top: 20px;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-family: "Afacad Flux", sans-serif;
  z-index: 2; /* Asegura que el botón esté sobre la imagen */
`;

const Decoracion = styled.img`
  position: absolute;
  top: 250px;
  left: 54%;
  transform: translateX(-50%);
  height: 40px;
  width: 40px;
  z-index: 2; /* Asegura que esté visible sobre la imagen */
`;

const DecoracionS = styled.img`
  position: absolute;
  top: 100px;
  right: 50px;
  transform: translateX(-50%);
  height: 60px;
  width: 60px;
  z-index: 2;
`;

const Ventas = styled.div`
  position: absolute;
  top: 115%;
  left: 60px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: "Afacad Flux", sans-serif;
  text-align: left;
  z-index: 2; /* Asegura que esté por encima de la imagen */

  .texto {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin: 0;
      font-size: 24px;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  img {
    height: 50px;
    width: auto;
  }
`;

const Banner = () => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleComprarAhora = () => {
    navigate("/productos"); // Redirigir a /carrito
  };

  return (
    <Contenido>
      <Imagen src="/src/assets/img/Rectangle 2.png" alt="Banner Image" />
      <Informacion>
        <Titulo>Encuentra ropa que combine con tu estilo</Titulo>
        <Descripcion>
          Navega por nuestra diversa gama de prendas meticulosamente elaboradas,
          diseñadas para resaltar tu individualidad y satisfacer tu sentido del
          estilo.
        </Descripcion>
        <Button onClick={handleComprarAhora}>Comprar Ahora</Button> {/* Agregar onClick */}
        <Ventas>
          <div className="texto">
            <h1>200+</h1>
            <p>Marcas Internacionales</p>
          </div>
          <img src="/src/assets/img/linea.png" alt="icono" />
          <div className="texto">
            <h1>2.000 +</h1>
            <p>Productos de Alta Calidad</p>
          </div>
          <img src="/src/assets/img/linea.png" alt="icono" />
          <div className="texto">
            <h1>3000</h1>
            <p>Consumidores</p>
          </div>
        </Ventas>
      </Informacion>
      <Decoracion src="/src/assets/img/Vector.png" alt="Decoracion" />
      <DecoracionS src="/src/assets/img/Vector.png" alt="Decoracion" />
      <Marcas />
    </Contenido>
  );
};

export default Banner;

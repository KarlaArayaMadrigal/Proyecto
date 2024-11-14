import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../componentes/Header";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// Estilos globales y contenedores
const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px;
  background-color: #f4f4f9;
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
`;

const Cards = styled.div`
  width: 300px;
  height: 450px;
  margin: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductoNombre = styled.h2`
  font-size: 20px;
  color: #333;
  margin-top: 15px;
`;

const Precio = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #2d4d63;
`;

const Cantidad = styled.p`
  font-size: 16px;
  color: #555;
`;

const BotonComprar = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4d63;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 16px;
  color: #555;
`;

const SelectButtonContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const SelectButton = styled(BotonComprar)`
  background-color: #000000;
  display: flex;
  margin-left: 120px;
  margin-top: -350px;
  &:hover {
    background-color: #2d4d63;
  }
`;

// Define la interfaz para las ventas
interface Venta {
  id_venta: number;
  precio: string;
  id_inventario: number;
  tipo_prenda: string;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [ventas, setVentas] = useState<Venta[]>([]); // Estado para almacenar las ventas
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [selectedVentas, setSelectedVentas] = useState<number[]>([]); // Estado para los artículos seleccionados

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch("http://localhost/Proyecto-Desarrollo/backend/api.php?action=ventas"); // Cambia la URL según tu API
        if (!response.ok) {
          throw new Error("Error al obtener las ventas");
        }
        const data: Venta[] = await response.json(); // Especifica que la respuesta es un array de Ventas
        setVentas(data); // Almacena las ventas en el estado
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido"); // Maneja el error
      }
    };

    fetchVentas(); // Llama a la función para obtener las ventas
  }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (id_venta: number) => {
    setSelectedVentas((prevSelected) => {
      if (prevSelected.includes(id_venta)) {
        // Si ya está seleccionado, lo eliminamos
        return prevSelected.filter((ventaId) => ventaId !== id_venta);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSelected, id_venta];
      }
    });
  };

  // Función para proceder con la compra de los artículos seleccionados
  const handleComprarSeleccionados = () => {
    if (selectedVentas.length === 0) {
      alert("No has seleccionado ningún artículo.");
    } else {
      alert(`Productos con ID ${selectedVentas.join(", ")} añadidos al carrito.`);
      // Aquí podrías hacer una petición para realizar la compra de los artículos seleccionados.
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Estilos globales se encuentran dentro del return */}
      <Header /> {/* Header se encuentra dentro del return */}
      <Container>
        <Titulo>Compras realizadas</Titulo>
        {error && <p>Error: {error}</p>} {/* Muestra el error si existe */}
        {ventas.length === 0 ? (
          <p>No se han realizado ventas.</p>
        ) : (
          ventas.map((venta) => (
            <Cards key={venta.id_venta}>
              <ProductoNombre>{venta.tipo_prenda}</ProductoNombre>
              <Precio>Precio: ${venta.precio}</Precio>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  id={`venta-${venta.id_venta}`}
                  onChange={() => handleCheckboxChange(venta.id_venta)}
                  checked={selectedVentas.includes(venta.id_venta)}
                />
                <CheckboxLabel htmlFor={`venta-${venta.id_venta}`}>Seleccionar</CheckboxLabel>
              </CheckboxContainer>
            </Cards>
          ))
        )}
      </Container>
      <SelectButtonContainer>
        <SelectButton onClick={handleComprarSeleccionados}>
          Comprar seleccionados
        </SelectButton>
      </SelectButtonContainer>
    </>
  );
};

export default Carrito;


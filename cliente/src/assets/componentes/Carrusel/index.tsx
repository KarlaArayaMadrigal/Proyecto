import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Tipos para las marcas
interface Marca {
  id: number;
  nombre: string;
  logo: string; // Nombre o URL de la imagen
}

// Estilos del carrusel
const CarruselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 20px;
  background-color: #f8f8f8;
`;

const MarcaCard = styled.div`
  min-width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
`;

const MarcaLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const MarcaNombre = styled.h3`
  font-size: 18px;
  color: #333;
`;

const ErrorMensaje = styled.p`
  color: red;
  text-align: center;
  font-size: 18px;
`;

// Componente Carrusel
const Carrusel: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]); // Estado tipado para las marcas
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get<Marca[]>("http://localhost:5000/api/marcas-con-ventas");
        console.log("Top 5 marcas vendidas:", response.data);
        setMarcas(response.data);
        setError(null); // Limpiar cualquier error previo
      } catch (error: any) {
        console.error("Error al obtener marcas:", error.message);
        setError("No se pudieron cargar las marcas. Intenta nuevamente más tarde.");
      }
    };

    fetchMarcas();
  }, []);

  return (
    <CarruselContainer>
      {error && <ErrorMensaje>{error}</ErrorMensaje>} {/* Mostrar mensaje de error si existe */}
      {marcas.map((marca) => (
        <MarcaCard key={marca.id}>
          <MarcaLogo src={`http://localhost:5000/images/${marca.logo}`} alt={marca.nombre} />
          <MarcaNombre>{marca.nombre}</MarcaNombre>
        </MarcaCard>
      ))}
    </CarruselContainer>
  );
};

export default Carrusel;

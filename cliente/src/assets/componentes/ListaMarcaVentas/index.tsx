import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Marca {
  marca: string;
}

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Afacad Flux", sans-serif;
  text-align: center;
  margin-top:10px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 20%;
  border-collapse: collapse;
  text-align: center;
  margin-left: 490px;

`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #000000;
  text-align: center;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #000000;
  color: #333;
  text-align: center;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const ErrorText = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
`;

const ListaMarcaVentas = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarcasConVentas = async () => {
      try {
        const response = await axios.get<Marca[]>("http://localhost/Proyecto-Desarrollo/backend/index.php/marcas/ventas");
        console.log(response.data); 
        setMarcas(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(new Error(err.response.data.message || 'Error desconocido'));
        } else {
          setError(new Error('Error de red'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarcasConVentas();
  }, []);

  if (loading) {
    return <LoadingText>Cargando...</LoadingText>;
  }

  if (error) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  // Verificación adicional para asegurarse de que marcas es un array
  if (!Array.isArray(marcas)) {
    return <ErrorText>Error: La respuesta no es un array.</ErrorText>;
  }

  return (
    <Container>
      <Title>Listado de Marcas con Ventas</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nombre de Marca</TableHeader>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca, index) => (
            <tr key={index}>
              <TableData>{marca.marca}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaMarcaVentas;

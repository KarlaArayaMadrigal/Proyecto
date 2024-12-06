import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Afacad Flux", sans-serif;
  text-align: center;
  margin-top: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  text-align: center;
  margin-left: 300px;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #060101;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #000000;
  color: #333;
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
interface Venta {
  marca: string;
  total_ventas: number;
}

const TopVentas: React.FC = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopVentas = () => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        "GET",
        "http://localhost/Proyecto-Desarrollo/backend/index.php/top",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const response: Venta[] = JSON.parse(xhr.responseText);
              setVentas(response);
            } catch (parseError) {
              setError("Error al procesar los datos recibidos");
              console.error(parseError);
            }
          } else {
            setError("Error al cargar las ventas más vendidas");
            console.error(`Error ${xhr.status}: ${xhr.statusText}`);
          }
          setLoading(false);
        }
      };

      xhr.send();
    };

    fetchTopVentas();
  }, []);

  if (loading) return <LoadingText>Cargando...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      <Title>Top 5 Marcas Más Vendidas</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Marca</TableHeader>
            <TableHeader>Cantidad Vendida</TableHeader>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <TableData>{venta.marca}</TableData>
              <TableData>{venta.total_ventas}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TopVentas;

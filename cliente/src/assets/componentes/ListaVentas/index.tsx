import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Afacad Flux", sans-serif;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #000000;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #000000;
  color: #333;
`;
type Venta = {
  id_venta: number;
  marca: string;
  precio: number;
  tipo_prenda: string;
  cantidad: number;
};

const ListaVentas: React.FC = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch(
          "http://localhost/Proyecto-Desarrollo/backend/index.php/ventas"
        );

        if (!response.ok) {
          throw new Error(
            `Error en la red: ${response.status} ${response.statusText}`
          );
        }

        const data: Venta[] = await response.json();
        setVentas(data);
      } catch (error) {
        setError("Error al obtener ventas: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Title>Lista de Ventas</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID Venta</TableHeader>
            <TableHeader>Marca</TableHeader>
            <TableHeader>Tipo de Prenda</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Precio</TableHeader>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <TableData>{venta.id_venta}</TableData>
              <TableData>{venta.marca}</TableData>
              <TableData>{venta.tipo_prenda}</TableData>
              <TableData>{venta.cantidad}</TableData>
              <TableData>${venta.precio}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaVentas;

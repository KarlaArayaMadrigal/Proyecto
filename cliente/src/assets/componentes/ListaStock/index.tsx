import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Producto {
  id_inventario: number;
  marca: string;
  tipo_prenda: string;
  talla: string;
  precio_unitario: number;
  cantidad_vendida: number;
  cantidad_restante: number;
}

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

const ListaStock = () => {

  const [productos, setPrendas] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost/Proyecto-Desarrollo/backend/index.php/stock')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        setPrendas(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener los datos');
        setLoading(false);
      });
  }, []); 

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  if (loading) {
    return <LoadingText>Cargando...</LoadingText>;
  }

  return (
    <Container>
      <Title>Prendas Vendidas y Stock Restante</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Marca</TableHeader>
            <TableHeader>Tipo de Prenda</TableHeader>
            <TableHeader>Talla</TableHeader>
            <TableHeader>Precio Unitario</TableHeader>
            <TableHeader>Cantidad Vendida</TableHeader>
            <TableHeader>Cantidad Restante</TableHeader>
          </tr>
        </thead>
        <tbody>
          {productos.map(item => (
            <tr key={item.id_inventario}>
              <TableData>{item.marca}</TableData>
              <TableData>{item.tipo_prenda}</TableData>
              <TableData>{item.talla}</TableData>
              <TableData>{item.precio_unitario}</TableData>
              <TableData>{item.cantidad_vendida}</TableData>
              <TableData>{item.cantidad_restante}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaStock;

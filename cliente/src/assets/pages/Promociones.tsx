import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fc;
    color: #333;
  }
`;

interface Venta {
  idVenta: number;
  nombreProducto: string;
  cantidad: number;
  fecha: string;
}

const Contenedor = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #2e3a59;
  margin-bottom: 30px;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

const TablaEncabezado = styled.th`
  background-color: #2e3a59;
  color: white;
  padding: 12px 15px;
  text-align: left;
`;

const TablaCelda = styled.td`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TablaFilaImpar = styled.tr`
  background-color: #f9f9f9;
  &:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

const NoData = styled.tr`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  height: 40px;
`;

const Promocion = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [error, setError] = useState<string | null>(null);  // Para manejar errores

  useEffect(() => {
    // Realizamos la solicitud GET al endpoint
    fetch('http://localhost/Proyecto-Desarrollo/backend/src/models/Venta.php')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVentas(data);
        } else {
          setError('No se encontraron ventas');
        }
      })
      .catch(err => {
        setError('Hubo un error al obtener las ventas');
        console.error(err);
      });
  }, []);


  return (
    <>
      <GlobalStyle />
      <Header />

      <Contenedor>
        <Titulo>Listado de Ventas</Titulo>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}  {/* Mostrar errores */}

        <Tabla>
          <thead>
            <tr>
              <TablaEncabezado>ID Venta</TablaEncabezado>
              <TablaEncabezado>Nombre del Producto</TablaEncabezado>
              <TablaEncabezado>Cantidad</TablaEncabezado>
              <TablaEncabezado>Fecha</TablaEncabezado>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta, index) => (
                <TablaFilaImpar key={venta.idVenta}>
                  <TablaCelda>{venta.idVenta}</TablaCelda>
                  <TablaCelda>{venta.nombreProducto}</TablaCelda>
                  <TablaCelda>{venta.cantidad}</TablaCelda>
                  <TablaCelda>{venta.fecha}</TablaCelda>
                </TablaFilaImpar>
              ))
            ) : (
              <NoData>
                <td colSpan={4}>No hay ventas registradas.</td>
              </NoData>
            )}
          </tbody>
        </Tabla>
      </Contenedor>
    </>
  );
};

export default Promocion;

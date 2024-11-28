import React, { useEffect, useState, useCallback } from "react";
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
  id_venta: number;
  precio: number;
  id_inventario: number;
  tipo_prenda: string;
  cantidad: number;
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
  const [error, setError] = useState<string | null>(null);

  const fetchVentas = useCallback(() => {
    const url = "http://localhost/Proyecto-Desarrollo/backend/src/models/Venta.php";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setVentas(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchVentas();
  }, [fetchVentas]);

  return (
    <>
      <GlobalStyle />
      <Header />

      <Contenedor>
        <Titulo>Listado de Ventas</Titulo>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <Tabla>
          <thead>
            <tr>
              <TablaEncabezado>ID Venta</TablaEncabezado>
              <TablaEncabezado>Precio</TablaEncabezado>
              <TablaEncabezado>ID Inventario</TablaEncabezado>
              <TablaEncabezado>Tipo de Prenda</TablaEncabezado>
              <TablaEncabezado>Cantidad</TablaEncabezado>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta) => (
                <TablaFilaImpar key={venta.id_venta}>
                  <TablaCelda>{venta.id_venta}</TablaCelda>
                  <TablaCelda>{venta.precio}</TablaCelda>
                  <TablaCelda>{venta.id_inventario}</TablaCelda>
                  <TablaCelda>{venta.tipo_prenda}</TablaCelda>
                  <TablaCelda>{venta.cantidad}</TablaCelda>
                </TablaFilaImpar>
              ))
            ) : (
              <NoData>
                <td colSpan={5}>No hay ventas registradas.</td>
              </NoData>
            )}
          </tbody>
        </Tabla>
      </Contenedor>
    </>
  );
};

export default Promocion;


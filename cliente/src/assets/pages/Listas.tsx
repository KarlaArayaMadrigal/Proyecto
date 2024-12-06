import React, { useEffect, useState, useCallback } from "react";
import Header from "../componentes/Header";
import styled, { createGlobalStyle } from "styled-components";
import ListaVentas from "../componentes/ListaVentas";
import ListaMarcaVentas from "../componentes/ListaMarcaVentas";
import ListaStock from "../componentes/ListaStock";
import TopVentas from "../componentes/TopVentas";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;


const Ventas = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <ListaVentas/>
      <ListaMarcaVentas/>
      <ListaStock/>
      <TopVentas/>
    </>
  );
};

export default Ventas;


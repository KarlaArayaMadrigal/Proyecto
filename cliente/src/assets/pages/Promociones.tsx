import React, { useEffect, useState, useCallback } from "react";
import Header from "../componentes/Header";
import styled, { createGlobalStyle } from "styled-components";
import ListaVentas from "../componentes/ListaVentas";

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
    </>
  );
};

export default Ventas;


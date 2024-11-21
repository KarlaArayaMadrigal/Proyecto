import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../componentes/Header";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 5px; 
  padding: 3px;
  background-color: #f4f4f9;
  justify-items: center; 
  
  /* Para pantallas pequeñas, ajustamos el número de columnas */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); 
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
  }
`;

const NoArticulos = styled.p`
  font-family: "Afacad Flux", sans-serif;
  font-size: 18px;
  text-align: center;
  display: flex;
  color: #555;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-top: 280px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: 0 auto;
  margin-right: -440px;
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
`;

const Cards = styled.div`
  width: 280px;
  height: max-content;
  margin: 15px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 230px;
  }
`;

const ProductoImagen = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: cover;
  border-radius: 8px;
  object-fit: contain;
`;

const ProductoNombre = styled.h2`
  font-size: 18px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
  margin: 10px 0;
  font-weight: 600;
`;

const Precio = styled.p`
  font-size: 18px;
  font-weight: bold;
  font-family: "Afacad Flux", sans-serif;
  color: #2d4d63;
`;

const InputCantidadContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Afacad Flux", sans-serif;
  align-items: center;
  margin-top: 10px;
`;

const InputCantidad = styled.input`
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  font-family: "Afacad Flux", sans-serif;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  margin-top: 5px;

  &:focus {
    outline: 2px solid #2d4d63;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  align-items: center; 
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px; 
`;

const CheckboxLabel = styled.label`
font-family: "Afacad Flux", sans-serif;
  font-size: 16px;
  color: #333;
  margin-left: 5px;
`;

const BorrarIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SelectButtonContainer = styled.div`
  text-align: center;
  margin-top: -519px;
  margin-left: 900px;
`;

const SelectButton = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  font-family: "Afacad Flux", sans-serif;
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

interface Producto {
  id_inventario: number;
  tipo_prenda: string;
  precio: number;
  imagen_url: string;
}

interface ProductoSeleccionado {
  id_inventario: number;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [seleccionados, setSeleccionados] = useState<ProductoSeleccionado[]>([]);
  const [checkboxes, setCheckboxes] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
      const productos = JSON.parse(storedCarrito);

      // Eliminar productos duplicados
      const productosUnicos = productos.filter(
        (producto: Producto, index: number, self: Producto[]) =>
          self.findIndex((p) => p.id_inventario === producto.id_inventario) ===
          index
      );

      setCarrito(productosUnicos);
    }
  }, []);

  const handleCantidadChange = (id: number, cantidad: number) => {
    setSeleccionados((prev) => {
      const existe = prev.find((item) => item.id_inventario === id);
      if (existe) {
        return prev.map((item) =>
          item.id_inventario === id ? { ...item, cantidad } : item
        );
      }
      return [...prev, { id_inventario: id, cantidad }];
    });
  };

  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prev) => {
      const updatedCheckboxes = { ...prev, [id]: !prev[id] };
      if (!updatedCheckboxes[id]) {
        setSeleccionados((prevSeleccionados) =>
          prevSeleccionados.filter((item) => item.id_inventario !== id)
        );
      }
      return updatedCheckboxes;
    });
  };

  const handleEliminarProducto = (id: number) => {
    // Eliminar el producto del carrito
    const newCarrito = carrito.filter((producto) => producto.id_inventario !== id);
    setCarrito(newCarrito);

    // Eliminar del localStorage
    localStorage.setItem("carrito", JSON.stringify(newCarrito));

    // Eliminar también de los productos seleccionados y checkboxes
    setSeleccionados((prevSeleccionados) =>
      prevSeleccionados.filter((item) => item.id_inventario !== id)
    );
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = { ...prevCheckboxes };
      delete updatedCheckboxes[id];
      return updatedCheckboxes;
    });
  };

  const handleConfirmarCompra = async () => {
    const productosSeleccionados = seleccionados
      .filter((item) => item.cantidad > 0)  // Filtramos los productos con cantidad mayor a 0
      .map((seleccionado) => {
        const producto = carrito.find(
          (p) => p.id_inventario === seleccionado.id_inventario
        );
        return { ...producto, cantidad: seleccionado.cantidad };  // Añadimos la cantidad seleccionada
      });
  
    if (productosSeleccionados.length === 0) {
      alert("Selecciona al menos un producto y cantidad para confirmar la compra.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost/Proyecto-Desarrollo/backend/src/models/Venta.php', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: productosSeleccionados }), 
      });
  
      if (response.ok) {
        alert("Compra confirmada!");
        console.log("Productos seleccionados enviados al backend:", productosSeleccionados);
        
      } else {
        alert("Error al confirmar la compra. Intenta nuevamente.");
      }
    } catch (error) {
      alert("Hubo un error al procesar tu compra.");
      console.error(error);
    }
  };
  

  return (
    <>
      <GlobalStyle />
      <Header />
      <Titulo>Carrito de compras</Titulo>
      <Container>
        {carrito.length === 0 ? (
          <NoArticulos>No hay artículos en el carrito.</NoArticulos>
        ) : (
          carrito.map((producto) => (
            <Cards key={producto.id_inventario}>
              <ProductoImagen
                src={producto.imagen_url}
                alt={producto.tipo_prenda}
              />
              <ProductoNombre>{producto.tipo_prenda}</ProductoNombre>
              <Precio>Precio: ${producto.precio}</Precio>
              <InputCantidadContainer>
                <label htmlFor={`cantidad-${producto.id_inventario}`}>
                  Cantidad:
                </label>
                <InputCantidad
                  id={`cantidad-${producto.id_inventario}`}
                  type="number"
                  min="1"
                  defaultValue="1"
                  onChange={(e) =>
                    handleCantidadChange(
                      producto.id_inventario,
                      parseInt(e.target.value, 10) || 1
                    )
                  }
                />
              </InputCantidadContainer>
              <ActionContainer>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    id={`checkbox-${producto.id_inventario}`}
                    checked={checkboxes[producto.id_inventario] || false}
                    onChange={() => handleCheckboxChange(producto.id_inventario)}
                  />
                  <CheckboxLabel htmlFor={`checkbox-${producto.id_inventario}`}>
                    Seleccionar
                  </CheckboxLabel>
                </CheckboxContainer>
                <BorrarIcon
                  src="/src/assets/img/borrar.png"
                  alt="Borrar"
                  onClick={() => handleEliminarProducto(producto.id_inventario)}
                />
              </ActionContainer>
            </Cards>
          ))
        )}
      </Container>
      <SelectButtonContainer>
        <SelectButton onClick={handleConfirmarCompra}>
          Confirmar compra
        </SelectButton>
      </SelectButtonContainer>
    </>
  );
};

export default Carrito;

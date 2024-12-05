import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Estilos
const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f4f4f9;
  width: 100%;
  font-family: "Afacad Flux", sans-serif;
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
  margin-top: 100px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: 0 auto;
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 80%;  
  max-width: 1200px;  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-left: auto;
  margin-right: auto;  

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;


const ProductoImagen = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  border-radius: 8px;
  margin-left: 120px;
`;

const ProductoNombre = styled.h2`
  font-size: 18px;
  font-family: "Afacad Flux", sans-serif;
  color: #333;
  margin: 10px 0;
  font-weight: 600;
`;

const Precio = styled.p`
  font-size: 20px;
  font-weight: bold;
  font-family: "Afacad Flux", sans-serif;
  color: #2d4d63;
  margin: 10px 0;
`;

const InputCantidadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;

const InputCantidad = styled.input`
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
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
  margin-top: 15px;
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
const Total = styled.h2`
display: flex;
 font-size: 20px;
  font-weight: bold;
  font-family: "Afacad Flux", sans-serif;
  color: #000000;
  margin: 10px 15px;
`;

const SelectButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
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

const DetallesProductoContainer = styled.div`
  margin-top: 10px;
`;

const Detalle = styled.p`
  font-family: "Afacad Flux", sans-serif;
  font-size: 16px;
  color: #333;
  margin: 5px 0;

  strong {
    font-weight: bold;
  }
`;

interface Producto {
  id_inventario: number;
  id_marca: number | null;
  marca: string;
  tipo_prenda: string;
  talla: string;
  cantidad_disponible: number;
  precio: number;
  imagen_url: string;
}

interface ProductoSeleccionado {
  id_inventario: number;
  cantidad: number;
}


const ListaCarrito: React.FC = () => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [seleccionados, setSeleccionados] = useState<ProductoSeleccionado[]>([]);
  const [checkboxes, setCheckboxes] = useState<{ [key: number]: boolean }>({});
  const [precioTotal, setPrecioTotal] = useState<number>(0); 

  useEffect(() => {
    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
      const productos = JSON.parse(storedCarrito);
      const productosUnicos = productos.filter(
        (producto: Producto, index: number, self: Producto[]) =>
          self.findIndex((p) => p.id_inventario === producto.id_inventario) ===
          index
      );
      setCarrito(productosUnicos);
    }
  }, []);

  useEffect(() => {
    
    const total = seleccionados.reduce((acc, item) => {
      const producto = carrito.find(p => p.id_inventario === item.id_inventario);
      return producto ? acc + (producto.precio * item.cantidad) : acc;
    }, 0);
    setPrecioTotal(total);
  }, [seleccionados, carrito]); 

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
      if (updatedCheckboxes[id]) {
        
        const producto = carrito.find(p => p.id_inventario === id);
        if (producto) {
          setSeleccionados((prevSeleccionados) => [
            ...prevSeleccionados,
            { id_inventario: id, cantidad: 1 }, 
          ]);
        }
      } else {
        
        setSeleccionados((prevSeleccionados) =>
          prevSeleccionados.filter((item) => item.id_inventario !== id)
        );
      }
      return updatedCheckboxes;
    });
  };

  const handleEliminarProducto = (id: number) => {
    const newCarrito = carrito.filter(
      (producto) => producto.id_inventario !== id
    );
    setCarrito(newCarrito);
    localStorage.setItem("carrito", JSON.stringify(newCarrito));
    
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
      .filter((item) => item.cantidad > 0)
      .map((seleccionado) => {
        const producto = carrito.find(
          (p) => p.id_inventario === seleccionado.id_inventario
        );

        if (!producto) {
          console.error(
            `Producto con id_inventario ${seleccionado.id_inventario} no encontrado en el carrito.`
          );
          return null;
        }

        return {
          id_inventario: producto.id_inventario,
          marca: producto.marca,
          precio: producto.precio.toString(),
          tipo_prenda: producto.tipo_prenda,
          cantidad: seleccionado.cantidad,
        };
      })
      .filter((item) => item !== null);

    if (productosSeleccionados.length === 0) {
      alert(
        "Selecciona al menos un producto y cantidad para confirmar la compra."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/Proyecto-Desarrollo/backend/index.php/ventas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productosSeleccionados),
        }
      );

      if (response.ok) {
        alert("Compra realizada con éxito");
        localStorage.removeItem("carrito");
        setCarrito([]); 
        setSeleccionados([]);
        setCheckboxes({});
      } else {
        const errorData = await response.json();
        console.error("Error en la compra", errorData);
        alert(`Hubo un error al realizar la compra: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error en la compra", error);
      alert("Hubo un error al realizar la compra.");
    }
  };

  if (carrito.length === 0) {
    return <NoArticulos>No tienes productos en tu carrito.</NoArticulos>;
  }

  return (
    <Container>
      <Titulo>Carrito de Compras</Titulo>
      {carrito.map((producto) => (
        <Cards key={producto.id_inventario}>
          <ProductoImagen
            src={producto.imagen_url}
            alt={`Imagen de ${producto.marca}`}
          />
          <div>
            <Precio>Precio: ₡{producto.precio}</Precio>
            <DetallesProductoContainer>
              <ProductoNombre>Marca: {producto.marca}</ProductoNombre>
              <Detalle>
                <strong>Tipo de prenda:</strong> {producto.tipo_prenda}
              </Detalle>
              <Detalle>
                <strong>Talla:</strong> {producto.talla}
              </Detalle>
              <Detalle>
                <strong>Cantidad disponible:</strong> {producto.cantidad_disponible}
              </Detalle>
            </DetallesProductoContainer>
          </div>
          <div>
            <InputCantidadContainer>
              <label htmlFor={`cantidad-${producto.id_inventario}`}>
                Cantidad:
              </label>
              <InputCantidad
                id={`cantidad-${producto.id_inventario}`}
                type="number"
                min="1"
                max={producto.cantidad_disponible}
                value={seleccionados.find(
                  (item) => item.id_inventario === producto.id_inventario
                )?.cantidad || 0}
                onChange={(e) =>
                  handleCantidadChange(
                    producto.id_inventario,
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </InputCantidadContainer>
            <ActionContainer>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  checked={checkboxes[producto.id_inventario] || false}
                  onChange={() => handleCheckboxChange(producto.id_inventario)}
                />
                <CheckboxLabel>Seleccionar</CheckboxLabel>
              </CheckboxContainer>
              <BorrarIcon
                src="/src/assets/img/borrar.png"
                alt="Eliminar"
                onClick={() => handleEliminarProducto(producto.id_inventario)}
              />
            </ActionContainer>
          </div>
        </Cards>
      ))}
      <SelectButtonContainer>
        <SelectButton onClick={handleConfirmarCompra}>
          Confirmar Compra
        </SelectButton>
      </SelectButtonContainer>
      <Total>Total a pagar: ₡{precioTotal.toFixed(2)}</Total>
    </Container>
  );
};

export default ListaCarrito;

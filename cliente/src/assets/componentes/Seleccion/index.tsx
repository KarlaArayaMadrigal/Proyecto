import { useState } from "react";
import styled from "styled-components";

const ListaOpciones = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Seleccion = styled.select`
  border: none;
  font-family: 'Afacad Flux', sans-serif;
  color: black;
  padding: 5px;
  width: 79px; 
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px; 
`;

const SeleccionOpciones = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Función para manejar el cambio de selección
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Imprimir el evento recibido para depuración
    console.log("Evento recibido:", event);

    // Verifica si el evento y event.target están definidos
    if (event && event.target) {
      setSelectedOption(event.target.value);
      console.log("Opción seleccionada:", event.target.value);
    } else {
      console.error("Error: evento o event.target no definido", event);
    }
  };

  return (
    <div>
      <ListaOpciones>
        <Seleccion
          value={selectedOption}
          onChange={handleChange} 
        >
          <option value="" disabled>
            Tienda
          </option>
          <option value="ropa">Ropa</option>
          <option value="zapatos">Zapatos</option>
          <option value="accesorios">Accesorios</option>
        </Seleccion>
      </ListaOpciones>
    </div>
  );
};

export default SeleccionOpciones;

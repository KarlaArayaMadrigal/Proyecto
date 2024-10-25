import { useState } from "react";
import styled from "styled-components";

const ListaOpciones = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; 
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
  z-index: 11; 
`;

const SeleccionOpciones = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Evento recibido:", event);

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


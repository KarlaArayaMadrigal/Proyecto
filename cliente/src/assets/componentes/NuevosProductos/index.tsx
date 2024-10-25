import styled from "styled-components";
import Cards from "../Cards";

const Contenido = styled.h3`
    font-size: 50px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Afacad Flux', sans-serif;
    padding: 5px;
    margin-top: 20px;
`
;
const NuevosProductos = () => {
    return (
        <Contenido>
            Nuevos Productos
            <Cards/>
        </Contenido>
    )

}
export default NuevosProductos;
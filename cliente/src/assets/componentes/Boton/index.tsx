import styled from 'styled-components';

const BotonComprar = styled.button`
  background-color: #4CAF50; /* Color verde */
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Cambio de color al pasar el ratón */
  }
`;

export default BotonComprar;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL del backend
});

export const fetchInventario = async () => {
  try {
    const response = await api.get('/inventario');
    return response.data;
  } catch (error) {
    console.error('Error al obtener inventario', error);
    throw error;
  }
};

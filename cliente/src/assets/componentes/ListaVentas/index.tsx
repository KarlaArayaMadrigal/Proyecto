import React, { useEffect, useState } from 'react';

type Venta = {
    id_venta: number;
    marca : string;
    precio: number;
    tipo_prenda: string;
    cantidad: number;
};

const ListaVentas: React.FC = () => {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await fetch('http://localhost/Proyecto-Desarrollo/backend/index.php/ventas');

                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
                }

                const data: Venta[] = await response.json();
                setVentas(data);
            } catch (error) {
                setError('Error al obtener ventas: ' + (error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchVentas();
    }, []);

    if (loading) return <p>Cargando ventas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de Ventas</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Marca</th>
                        <th>Tipo de Prenda</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id_venta}>
                            <td>{venta.id_venta}</td>
                            <td>{venta.marca}</td>
                            <td>{venta.tipo_prenda}</td>
                            <td>{venta.cantidad}</td>
                            <td>${venta.precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaVentas;


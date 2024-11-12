import { useState, useEffect } from "react";

interface Inventario {
  id_inventario: number;
  tipo_prenda: string;
  imagen_url: string;
  precio: number;
}

export default function Inventarios() {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");

  useEffect(() => {
    const obtenerInventarios = async () => {
      const response = await fetch("/api/inventarios");
      const data: Inventario[] = await response.json();
      console.log(data); // Verifica la estructura de los datos
      setInventarios(data);
    };

    obtenerInventarios();
  }, []);

  // Filtrar los inventarios por categoría seleccionada
  const inventariosFiltrados = inventarios.filter(
    (inventario) => inventario.tipo_prenda.toLowerCase().includes(categoriaSeleccionada.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1>Inventarios</h1>
        <input
          type="text"
          placeholder="Buscar por tipo de prenda"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        />
      </div>

      <div>
        {inventariosFiltrados.length > 0 ? (
          inventariosFiltrados.map((inventario) => (
            <div key={inventario.id_inventario} className="inventario-item">
              <h3>{inventario.tipo_prenda}</h3>
              {/* Muestra la imagen o una imagen por defecto si no existe */}
              <img
                src={inventario.imagen_url || "/path/to/default-image.jpg"}
                alt={inventario.tipo_prenda}
                className="object-cover"
              />
              <p>${inventario.precio}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
}

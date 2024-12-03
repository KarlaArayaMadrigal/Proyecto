<?php
require_once './src/models/Venta.php';
include_once './src/db/DbConnect.php';

header("Content-Type: application/json");

class VentaController
{
    public function index()
    {
        $venta = new Venta();
        
        // Intentamos obtener los datos
        $result = $venta->getAll();

        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'No se encontraron ventas']);
        }
    }

    public function getById($id)
    {
        $venta = new Venta();
        $result = $venta->getById($id);

        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Venta no encontrada']);
        }
    }

    public function create()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Verificar que los productos estén presentes
        if (!isset($data['productos']) || empty($data['productos'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
            return;
        }

        // Verificar que los datos de la venta estén completos
        if (!isset($data['precio'], $data['marca'], $data['tipo_prenda'], $data['cantidad'], $data['id_inventario'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos de venta incompletos']);
            return;
        }

        // Crear una instancia del modelo Venta
        $venta = new Venta();
        
        // Asignar los datos de la venta
        $venta->precio = $data['precio'];
        $venta->marca = $data['marca'];
        $venta->tipo_prenda = $data['tipo_prenda'];
        $venta->cantidad = $data['cantidad'];
        $venta->id_inventario = $data['id_inventario'];

    
        if ($venta->create($data['productos'])) {
            http_response_code(201);
            echo json_encode(['message' => 'Venta creada exitosamente']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo crear la venta']);
        }
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Verificar que los datos estén completos
        if (!isset($data['precio'], $data['marca'], $data['tipo_prenda'], $data['cantidad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
            return;
        }

        $venta = new Venta();
        $venta->id_venta = $id;
        $venta->precio = $data['precio'];
        $venta->marca = $data['marca'];
        $venta->tipo_prenda = $data['tipo_prenda'];
        $venta->cantidad = $data['cantidad'];

        if ($venta->update()) {
            echo json_encode(['message' => 'Venta actualizada']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo actualizar la venta']);
        }
    }

    public function delete($id)
    {
        $venta = new Venta();
        if ($venta->delete($id)) {
            echo json_encode(['message' => 'Venta eliminada']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo eliminar la venta']);
        }
    }
}
?>







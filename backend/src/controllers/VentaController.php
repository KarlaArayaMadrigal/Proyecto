<?php
require_once './src/models/Venta.php';
include_once './src/db/DbConnect.php';

header("Content-Type: application/json");

class VentaController
{
    public function index()
    {
        $venta = new Venta();
        
        
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
    
    if (!isset($data) || !is_array($data) || empty($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos']);
        return;
    }

    $venta = new Venta();
    
    foreach ($data as $producto) {
        if (!isset($producto['id_inventario'], $producto['marca'], $producto['precio'], $producto['tipo_prenda'], $producto['cantidad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos de producto incompletos']);
            return;
        }
    }

    // Aquí puedes crear cada venta en la base de datos
    foreach ($data as $producto) {
        if (!$venta->create($producto)) {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo crear la venta']);
            return;
        }
    }

    http_response_code(201);
    echo json_encode(['message' => 'Ventas creadas exitosamente']);
}

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        
       
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







<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/src/controllers/VentaController.php';
require_once __DIR__ . '/src/controllers/InventarioController.php';
require_once __DIR__ . '/src/controllers/ProductoController.php';

$method = $_SERVER['REQUEST_METHOD'];
$url = str_replace('/Proyecto-Desarrollo/backend/index.php', '', $_SERVER['REQUEST_URI']);

$ventaController = new VentaController();
$inventarioController = new InventarioController();
$productoController = new ProductoController();

// Rutas para Ventas
if ($method === 'GET' && $url === '/ventas') {
    $ventaController->index();
} elseif ($method === 'GET' && preg_match('/^\/venta\/([0-9]+)$/', $url, $matches)) {
    $ventaController->getById($matches[1]);
}

// Rutas para Inventario
elseif ($method === 'GET' && $url === '/inventario') {
    $inventarioController->index();
} elseif ($method === 'GET' && preg_match('/^\/inventario\/([0-9]+)$/', $url, $matches)) {
    $inventarioController->getById($matches[1]);
} elseif ($method === 'POST' && $url === '/inventario') {
    $inventarioController->create(); 
} elseif ($method === 'PUT' && preg_match('/^\/inventario\/([0-9]+)$/', $url, $matches)) {
    // Obtener el ID del producto
    $id_producto = $matches[1];

    // Obtener los datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Asegúrate de que $data no sea nulo y contenga los campos necesarios
    if ($data && isset($data['nombre'], $data['precio'], $data['cantidad'])) {
        $inventarioController->update($id_producto, $data);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos']);
    }
} elseif ($method === 'DELETE' && preg_match('/^\/inventario\/([0-9]+)$/', $url, $matches)) {
    $inventarioController->delete($matches[1]); // Asegúrate de implementar el método delete en tu controlador
}

// Rutas para Productos
elseif ($method === 'GET' && $url === '/producto') {
    $productoController->index();
} elseif ($method === 'GET' && preg_match('/^\/producto\/([0-9]+)$/', $url, $matches)) {
    $productoController->getById($matches[1]);
} elseif ($method === 'POST' && $url === '/producto') {
    $productoController->create(); // Asegúrate de implementar el método create en tu controlador
} elseif ($method === 'PUT' && preg_match('/^\/producto\/([0-9]+)$/', $url, $matches)) {
    
    $id_producto = $matches[1];

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && isset($data['nombre'], $data['precio'], $data['cantidad'])) {
        $productoController->update($id_producto, $data);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos']);
    }
} elseif ($method === 'DELETE' && preg_match('/^\/producto\/([0-9]+)$/', $url, $matches)) {
    $productoController->delete($matches[1]); 
}

// Manejo de rutas no encontradas
else {
    http_response_code(404);
    echo json_encode(['message' => 'Ruta no encontrada']);
}
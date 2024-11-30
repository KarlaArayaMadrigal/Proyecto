<?php
// Agregar encabezados CORS
header("Access-Control-Allow-Origin: http://localhost:5173"); // Cambia esto a tu origen permitido
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Incluir controladores
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
    $id_inventario = $matches[1];
    $data = json_decode(file_get_contents("php://input"), true);

    // Validar que los datos necesarios estén presentes
    if ($data && isset($data['tipo_prenda'], $data['cantidad_disponible'], $data['precio'], $data['imagen_url'])) {
        $inventarioController->update($id_inventario, $data);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos o inválidos']);
    }
} elseif ($method === 'DELETE' && preg_match('/^\/inventario\/([0-9]+)$/', $url, $matches)) {
    $inventarioController->delete($matches[1]);
}

// Rutas para Productos
elseif ($method === 'GET' && $url === '/producto') {
    $productoController->index();
} elseif ($method === 'GET' && preg_match('/^\/producto\/([0-9]+)$/', $url, $matches)) {
    $productoController->getById($matches[1]);
} elseif ($method === 'POST' && $url === '/producto') {
    $productoController->create(); 
} elseif ($method === 'PUT' && preg_match('/^\/producto\/([0-9]+)$/', $url, $matches)) {
    $id_producto = $matches[1];
    $data = json_decode(file_get_contents("php://input"), true);

    // Validar que los datos necesarios estén presentes
    if ($data && isset($data['nombre'], $data['precio'], $data['cantidad'])) {
        $productoController->update($id_producto, $data);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos']);
    }
} elseif ($method === 'DELETE' && preg_match('/^\/producto\/([0-9]+)$/', $url, $matches)) {
    $productoController->delete($matches[1]);
}
else {
    http_response_code(404);
    echo json_encode(['message' => 'Ruta no encontrada']);
}
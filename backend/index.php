<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/src/controllers/VentaController.php';
require_once __DIR__ . '/src/controllers/InventarioController.php';

$method = $_SERVER['REQUEST_METHOD'];
$url = str_replace('/Proyecto-Desarrollo/backend/index.php', '', $_SERVER['REQUEST_URI']);


$ventaController = new VentaController();
$inventarioController = new InventarioController();

if ($method === 'GET' && $url === '/ventas') {
    $ventaController->index();
} elseif ($method === 'GET' && preg_match('/^\/venta\/([0-9]+)$/', $url, $matches)) {
    $ventaController->getById($matches[1]);
}

elseif ($method === 'GET' && $url === '/inventario') {
    $inventarioController->index();
} elseif ($method === 'GET' && preg_match('/^\/inventario\/([0-9]+)$/', $url, $matches)) {
    $inventarioController->getById($matches[1]);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Ruta no encontrada']);
}
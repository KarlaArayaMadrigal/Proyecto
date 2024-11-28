<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require '../src/routes.php';

$method = $_SERVER;

$path = trim($_SERVER['PATH_INFO'], characters: '/');

$segments = explode('/', $path);

$queryString = $_SERVER['QUERY_STRING'];

parse_str($queryString, $queryParams);

require_once 'controllers/VentaController.php';

$ventaController = new VentaController();

// Definir las rutas para manejar solicitudes GET

// Ruta para obtener todas las ventas
if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_SERVER['REQUEST_URI'] == '/ventas') {
    $ventaController->obtenerVentas();
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET' && preg_match('/^\/venta\/([0-9]+)$/', $_SERVER['REQUEST_URI'], $matches)) {
    // Ruta para obtener una venta por ID
    $ventaController->obtenerVentaPorId($matches[1]);
} else {
    echo json_encode(['message' => 'Ruta no encontrada']);
}
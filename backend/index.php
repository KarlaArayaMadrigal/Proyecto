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

// index.php
require_once 'controllers/VentaController.php';

// Verifica qué método se está llamando
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        // Obtener venta por ID
        $controller = new VentaController();
        $controller->obtenerVentaPorId($_GET['id']);
    } else {
        // Obtener todas las ventas
        $controller = new VentaController();
        $controller->obtenerVentas();
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Crear una nueva venta
    $controller = new VentaController();
    $controller->crearVenta();
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['id'])) {
    // Eliminar venta
    $controller = new VentaController();
    $controller->eliminarVenta($_GET['id']);
} else {
    echo json_encode(['error' => 'Método no permitido']);
}

?>

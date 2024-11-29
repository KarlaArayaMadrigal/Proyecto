<?php
// Headers comunes para manejo de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de solicitudes OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluye controladores y configuración
require_once __DIR__ . '/src/db/DbConnect.php';
require_once __DIR__ . '/src/controllers/InventarioController.php';
require_once __DIR__ . '/src/controllers/CarritoController.php';
require_once __DIR__ . '/src/controllers/VentaController.php';
require_once __DIR__ . '/src/controllers/UsuarioController.php';

// Obtén el método HTTP y la ruta solicitada
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestUri = trim($requestUri, '/');

// Define las rutas y controla las solicitudes
switch ($requestUri) {
    case 'inventario':
        $controller = new InventarioController();
        if ($method === 'GET') {
            if (isset($_GET['id_inventario'])) {
                $controller->getById($_GET['id_inventario']);
            }
            }

    case 'carrito':
        $controller = new CarritoController();
        if ($method === 'POST') {
            $controller->agregarAlCarrito();
        }
        break;

    case 'venta':
        $controller = new VentaController();
        if ($method === 'GET') {
            if (isset($_GET['id_venta'])) {
                $controller->getById($_GET['id_venta']);
            } else {
                $controller->index();
            }
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($method === 'PUT') {
            parse_str(file_get_contents("php://input"), $putData);
            if (isset($putData['id_venta'])) {
                $controller->update($putData['id_venta'], $putData);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de venta requerido']);
            }
        } elseif ($method === 'DELETE') {
            if (isset($_GET['id_venta'])) {
                $controller->delete($_GET['id_venta']);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de venta requerido']);
            }
        }
        break;

    case 'usuario':
        $usuarioController = new UsuarioController();

if ($method === 'POST' && $url === '/usuarios') {
    $usuarioController->create();
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Ruta no encontrada']);
}
}
?>


<?php
// Headers comunes
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de solicitudes OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluye controladores y configuración
require_once './db/DbConnect.php';
require_once './controllers/InventarioController.php';
require_once './controllers/CarritoController.php';
require_once './controllers/VentaController.php';
require_once './controllers/UsuarioController.php';

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
            } elseif (isset($_GET['tipo_prenda'])) {
                $controller->buscarPorTipo($_GET['tipo_prenda']);
            } else {
                $controller->getAll();
            }
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($method === 'PUT') {
            parse_str(file_get_contents("php://input"), $putData);
            if (isset($putData['id_inventario'])) {
                $controller->update($putData['id_inventario'], $putData);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de inventario requerido']);
            }
        } elseif ($method === 'DELETE') {
            if (isset($_GET['id_inventario'])) {
                $controller->delete($_GET['id_inventario']);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de inventario requerido']);
            }
        }
        break;

    case 'carrito':
        $controller = new CarritoController();
        if ($method === 'POST') {
            $controller->agregarAlCarrito();
        }
        break;

    case 'venta':
        $controller = new VentaController();
        if ($method === 'POST') {
            $controller->create();
        }
        break;

    case 'usuario':
        $controller = new UsuarioController();
        if ($method === 'POST') {
            $controller->create();
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada']);
        break;
}
?>

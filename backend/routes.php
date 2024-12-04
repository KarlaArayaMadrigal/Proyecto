<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once __DIR__ . '/src/db/DbConnect.php';
require_once __DIR__ . '/src/controllers/InventarioController.php';
require_once __DIR__ . '/src/controllers/CarritoController.php';
require_once __DIR__ . '/src/controllers/VentaController.php';
require_once __DIR__ . '/src/controllers/UsuarioController.php';
require_once __DIR__ . '/src/controllers/ProductoController.php';


$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestUri = trim($requestUri, '/');

switch ($requestUri) {
    case 'inventario':
        $controller = new InventarioController();
        if ($method === 'GET') {
            if (isset($_GET['id_inventario'])) {
                $controller->getById($_GET['id_inventario']);
            } else {
                $controller->index();
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
            if ($method === 'GET') {
                if (isset($_GET['id_venta'])) {
                    $controller->getById($_GET['id_venta']);
                } else {
                    $controller->index();
                }
            } elseif ($method === 'POST') {
                
                $data = json_decode(file_get_contents("php://input"), true);
                
                
                if (isset($data['productos']) && !empty($data['productos'])) {
                    
                    if (isset($data['precio'], $data['marca'], $data['tipo_prenda'], $data['cantidad'], $data['id_inventario'])) {
                        $controller->create($data);
                    } else {
                        http_response_code(400);
                        echo json_encode(['error' => 'Datos de venta incompletos']);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Datos de productos requeridos']);
                }
            } elseif ($method === 'PUT') {
                parse_str(file_get_contents("php://input"), $putData);
                if (isset($putData['id_venta'])) {
                    
                    if (isset($putData['precio'], $putData['marca'], $putData['tipo_prenda'], $putData['cantidad'])) {
                        $controller->update($putData['id_venta'], $putData);
                    } else {
                        http_response_code(400);
                        echo json_encode(['error' => 'Datos incompletos para la actualización']);
                    }
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
        case 'producto':
            $productoController = new ProductoController();
            if ($method === 'GET') {
                if (isset($_GET['id_producto'])) {
                    $productoController->getById($_GET['id_producto']);
                } else {
                    $productoController->index(); 
                }
            } elseif ($method === 'POST') {
                $productoController->create(); 
            } elseif ($method === 'PUT') {
                parse_str(file_get_contents("php://input"), $putData);
                if (isset($putData['id_producto'])) {
                    $productoController->update($putData['id_producto'], $putData);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'ID de producto requerido']);
                }
            } elseif ($method === 'DELETE') {
                if (isset($_GET['id_producto'])) {
                    $productoController->delete($_GET['id_producto']);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'ID de producto requerido']);
                }
            }
            break;
}

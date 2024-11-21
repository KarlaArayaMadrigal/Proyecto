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

/*if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ruta principal: redirecciona según el módulo
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

switch ($uri[0]) {
    case 'inventario':
        include 'controllers/InventarioController.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(['message' => 'Endpoint no encontrado']);
        break;
}*/
?>

<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // OK
    exit();
}

// Conexión a la base de datos
include 'DbConnect.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        if (isset($_GET['id_inventario'])) {
            getInventario($_GET['id_inventario']);
        } else {
            getInventario();
        }
        break;
    case 'POST':
        if (isset($_GET['action']) && $_GET['action'] === 'agregarCarrito') {
            agregarCarrito(); // Llama a la función para agregar al carrito
        } elseif (isset($_GET['action']) && $_GET['action'] === 'venta') {
            createVenta();
        } else {
            createInventario();
        }
        break;
    case 'PUT':
        if (isset($_GET['id_inventario'])) {
            updateInventario($_GET['id_inventario']);
        } else {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID de inventario requerido']);
        }
        break;
    case 'DELETE':
        if (isset($_GET['id_inventario'])) {
            deleteInventario($_GET['id_inventario']);
        } else {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID de inventario requerido']);
        }
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function getInventario($id = null)
{
    global $pdo;
    $query = "SELECT * FROM inventario";
    if ($id) {
        $query .= " WHERE id_inventario = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id', $id);
    } else {
        $stmt = $pdo->prepare($query);
    }
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function createInventario()
{
    global $pdo;
    $data = json_decode(file_get_contents('php://input'));

    // Validar que se reciban todos los datos necesarios
    if (!isset($data->id_marca) || !isset($data->tipo_prenda) || !isset($data->cantidad_disponible) || !isset($data->precio) || !isset($data->imagen_url)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos']);
        return;
    }

    $query = "INSERT INTO inventario (id_marca, tipo_prenda, cantidad_disponible, precio, imagen_url) VALUES (:id_marca, :tipo_prenda, :cantidad_disponible, :precio, :imagen_url)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id_marca', $data->id_marca);
    $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
    $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
    $stmt->bindParam(':precio', $data->precio);
    $stmt->bindParam(':imagen_url', $data->imagen_url);
    $stmt->execute();
    echo json_encode(['status' => 'success']);
}

function agregarCarrito()
{
    global $pdo;
    $data = json_decode(file_get_contents('php://input'));

    // Validar que se reciban todos los datos necesarios
    if (!isset($data->id_producto) || !isset($data->id_marca) || !isset($data->id_venta) || !isset($data->precio) || !isset($data->imagen_url) || !isset($data->cantidad_disponible) || !isset($data->tipo_prenda)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos']);
        return;
    }

    try {

        $query = "INSERT INTO carrito (id_producto, id_marca, id_venta, precio, imagen_url, cantidad_disponible, tipo_prenda) VALUES (:id_producto, :id_marca, :id_venta, :precio, :imagen_url, :cantidad_disponible, :tipo_prenda)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id_producto', $data->id_producto);
        $stmt->bindParam(':id_marca', $data->id_marca);
        $stmt->bindParam(':id_venta', $data->id_venta);
        $stmt->bindParam(':precio', $data->precio);
        $stmt->bindParam(':imagen_url', $data->imagen_url);
        $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
        $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
        $stmt->execute();

        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        error_log("Error en la base de datos: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    } catch (Exception $e) {
        error_log("Error inesperado: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error inesperado: ' . $e->getMessage()]);
    }
}

function createVenta()
{
    global $pdo;
    $data = json_decode(file_get_contents('php://input'));

    // Validar que se reciban todos los datos necesarios
    if (!isset($data->id_inventario) || !isset($data->tipo_prenda) || !isset($data->precio) || !isset($data->cantidad)) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos']);
        return;
    }

    try {
        $query = "INSERT INTO ventas (id_inventario, tipo_prenda, precio, cantidad) VALUES (:id_inventario, :tipo_prenda, :precio, :cantidad)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id_inventario', $data->id_inventario);
        $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
        $stmt->bindParam(':precio', $data->precio);
        $stmt->bindParam(':cantidad', $data->cantidad);
        $stmt->execute();

        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        error_log("Error en la base de datos: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    } catch (Exception $e) {
        error_log("Error inesperado: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error inesperado: ' . $e->getMessage()]);
    }
}

function updateInventario($id)
{
    global $pdo;
    $data = json_decode(file_get_contents('php://input'));

    // Validar que se reciban todos los datos necesarios
    if (!isset($data->id_marca) || !isset($data->tipo_prenda) || !isset($data->cantidad_disponible) || !isset($data->precio) || !isset($data->imagen_url)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos']);
        return;
    }

    try {
        $query = "UPDATE inventario SET id_marca = :id_marca, tipo_prenda = :tipo_prenda, cantidad_disponible = :cantidad_disponible, precio = :precio, imagen_url = :imagen_url WHERE id_inventario = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':id_marca', $data->id_marca);
        $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
        $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
        $stmt->bindParam(':precio', $data->precio);
        $stmt->bindParam(':imagen_url', $data->imagen_url);
        $stmt->execute();
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

function deleteInventario($id)
{
    global $pdo;
    try {
        $query = "DELETE FROM inventario WHERE id_inventario = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

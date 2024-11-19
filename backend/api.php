<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Reemplaza con el origen correcto
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
        } elseif (isset($_GET['tipo_prenda'])) {
            buscarInventario($_GET['tipo_prenda']); // Llama a la función de búsqueda
        } else {
            getInventario();
        }
        break;
    case 'POST':
        if (isset($_GET['action']) && $_GET['action'] === 'agregarCarrito') {
            agregarCarrito();
        } elseif (isset($_GET['action']) && $_GET['action'] === 'venta') {
            createVenta();
        } elseif (isset($_GET['action']) && $_GET['action'] === 'registrarUsuario') {
            createUsuario();
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

// Funciones existentes...

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

// Nueva función para buscar productos por tipo_prenda
function buscarInventario($tipo_prenda)
{
    global $pdo;

    // Si no se pasa tipo_prenda, devolvemos un mensaje indicando que no hay búsqueda
    if (empty($tipo_prenda)) {
        echo json_encode(['error' => 'No se especificó tipo de prenda']);
        return;
    }

    try {
        // Realizamos la consulta con LIKE para obtener coincidencias parciales
        $query = "SELECT * FROM inventario WHERE tipo_prenda LIKE :tipo_prenda";
        $stmt = $pdo->prepare($query);
        $tipo_prenda_param = "%" . $tipo_prenda . "%"; // Búsqueda parcial
        $stmt->bindParam(':tipo_prenda', $tipo_prenda_param);
        $stmt->execute();

        // Obtener los resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Verificamos si se encontraron resultados
        if (count($result) > 0) {
            echo json_encode($result);  // Devolvemos los productos encontrados
        } else {
            echo json_encode(['message' => 'No se encontraron productos']);
        }
    } catch (PDOException $e) {
        // Si ocurre un error en la consulta
        echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
}


function createInventario()
{
    global $pdo;
    $data = json_decode(file_get_contents('php://input'));

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

    if (!isset($data->id_inventario) || !isset($data->tipo_prenda) || !isset($data->precio) || !isset($data->cantidad)) {
        http_response_code(400);
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
        error_log("Error en la base de datos: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    } catch (Exception $e) {
        error_log("Error inesperado: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error inesperado: ' . $e->getMessage()]);
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
        error_log("Error en la base de datos: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
}

function createUsuario()
{
    global $pdo;

    // Obtén los datos del cuerpo de la solicitud
    $rawData = file_get_contents('php://input');
    error_log("Datos recibidos para crear usuario: " . $rawData);  // Log de los datos recibidos

    // Intenta decodificar los datos JSON
    $data = json_decode($rawData);

    // Verifica si json_decode devolvió null
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Error al decodificar JSON: ' . json_last_error_msg()]);
        return;
    }

    // Verifica que los datos necesarios estén presentes
    if (!isset($data->nombre) || !isset($data->correo) || !isset($data->password)) {
        error_log("Faltan datos requeridos: nombre, correo o contraseña"); // Log de error
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos']);
        return;
    }

    try {
        // Inserta los datos en la base de datos
        $query = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (:nombre, :correo, :password)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':nombre', $data->nombre);
        $stmt->bindParam(':correo', $data->correo);
        $stmt->bindParam(':password', $data->password); // Asegúrate de que esto coincida
        $stmt->execute();

        // Responde con éxito
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
?>

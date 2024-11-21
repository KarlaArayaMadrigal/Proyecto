<?php
// Configuración de la conexión a la base de datos
class DbConnect {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $this->connection = new PDO("mysql:host=localhost;dbname=tienda_luka", "root", "admin");
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new DbConnect();
        }
        return self::$instance->connection;
    }
}

// Modelo para interactuar con el inventario
class Inventario {
    private $db;

    public function __construct() {
        $this->db = DbConnect::getInstance();
    }

    // Obtener todos los productos
    public function getAllInventario() {
        $query = "SELECT * FROM inventario";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener un producto por su ID
    public function getInventarioById($id) {
        $query = "SELECT * FROM inventario WHERE id_inventario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Buscar productos por tipo
    public function buscarInventarioPorTipo($tipo_prenda) {
        $query = "SELECT * FROM inventario WHERE tipo_prenda LIKE :tipo_prenda";
        $stmt = $this->db->prepare($query);
        $tipo_prenda = '%' . $tipo_prenda . '%';
        $stmt->bindParam(':tipo_prenda', $tipo_prenda, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Crear un nuevo producto
    public function createInventario($data) {
        $query = "INSERT INTO inventario (tipo_prenda, cantidad_disponible, precio, imagen_url) 
                  VALUES (:tipo_prenda, :cantidad_disponible, :precio, :imagen_url)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':tipo_prenda', $data['tipo_prenda'], PDO::PARAM_STR);
        $stmt->bindParam(':cantidad_disponible', $data['cantidad_disponible'], PDO::PARAM_INT);
        $stmt->bindParam(':precio', $data['precio'], PDO::PARAM_STR);
        $stmt->bindParam(':imagen_url', $data['imagen_url'], PDO::PARAM_STR);
        $stmt->execute();
    }

    // Actualizar un producto existente
    public function updateInventario($id, $data) {
        $query = "UPDATE inventario 
                  SET tipo_prenda = :tipo_prenda, cantidad_disponible = :cantidad_disponible, precio = :precio, imagen_url = :imagen_url
                  WHERE id_inventario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':tipo_prenda', $data['tipo_prenda'], PDO::PARAM_STR);
        $stmt->bindParam(':cantidad_disponible', $data['cantidad_disponible'], PDO::PARAM_INT);
        $stmt->bindParam(':precio', $data['precio'], PDO::PARAM_STR);
        $stmt->bindParam(':imagen_url', $data['imagen_url'], PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }

    // Eliminar un producto
    public function deleteInventario($id) {
        $query = "DELETE FROM inventario WHERE id_inventario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }
}

// Endpoint para obtener todos los productos
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['id']) && !isset($_GET['tipo_prenda'])) {
    $inventarioModel = new Inventario();
    $productos = $inventarioModel->getAllInventario();
    echo json_encode($productos);
}

// Endpoint para obtener un producto por ID
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $inventarioModel = new Inventario();
    $producto = $inventarioModel->getInventarioById($id);
    echo json_encode($producto);
}

// Endpoint para buscar productos por tipo
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['tipo_prenda'])) {
    $tipo_prenda = $_GET['tipo_prenda'];
    $inventarioModel = new Inventario();
    $productos = $inventarioModel->buscarInventarioPorTipo($tipo_prenda);
    echo json_encode($productos);
}

// Endpoint para crear un nuevo producto
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'create') {
    $data = json_decode(file_get_contents("php://input"), true);
    $inventarioModel = new Inventario();
    $inventarioModel->createInventario($data);
    echo json_encode(["message" => "Producto agregado exitosamente"]);
}

// Endpoint para actualizar un producto
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET['id'];
    $inventarioModel = new Inventario();
    $inventarioModel->updateInventario($id, $data);
    echo json_encode(["message" => "Producto actualizado exitosamente"]);
}

// Endpoint para eliminar un producto
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $inventarioModel = new Inventario();
    $inventarioModel->deleteInventario($id);
    echo json_encode(["message" => "Producto eliminado exitosamente"]);
}
?>  

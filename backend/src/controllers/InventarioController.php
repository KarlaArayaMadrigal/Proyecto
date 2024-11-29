<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once './src/models/Inventario.php';
include_once './src/db/DbConnect.php';

class InventarioController {
    private $db; // Cambia esto a la propiedad correcta
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
        $this->db = $this->conn; // Asigna la conexión a la propiedad $db
    }

    // Listar todos los elementos del inventario
    public function index() {
        try {
            $query = "SELECT * FROM inventario";
            $stmt = $this->conn->query($query); // Usa $this->conn en lugar de $this->db
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el inventario: ' . $e->getMessage()]);
        }
    }

    // Obtener un elemento del inventario por ID
    public function getById($id) {
        try {
            $query = "SELECT * FROM inventario WHERE id = :id";
            $stmt = $this->conn->prepare($query); // Usa $this->conn en lugar de $this->db
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Elemento no encontrado']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el elemento: ' . $e->getMessage()]);
        }
    }
}

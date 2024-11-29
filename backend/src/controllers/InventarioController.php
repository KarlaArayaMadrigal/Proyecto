<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once './src/models/Inventario.php';
include_once './src/db/DbConnect.php';

class InventarioController {
    private $db;
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
        $this->db = $this->conn;
    }

    // Listar todos los elementos del inventario
    public function index() {
        try {
            $query = "SELECT * FROM inventario";
            $stmt = $this->conn->query($query);
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
            $stmt = $this->conn->prepare($query);
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

    // Crear un nuevo elemento en el inventario
    public function create() {
        $data = json_decode(file_get_contents("php://input"));

        if (isset($data->tipo_prenda, $data->cantidad_disponible, $data->precio, $data->imagen_url)) {
            try {
                $query = "INSERT INTO inventario (tipo_prenda, cantidad_disponible, precio, imagen_url) VALUES (:tipo_prenda, :cantidad_disponible, :precio, :imagen_url)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
                $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
                $stmt->bindParam(':precio', $data->precio);
                $stmt->bindParam(':imagen_url', $data->imagen_url);
                $stmt->execute();

                http_response_code(201);
                echo json_encode(['message' => 'Elemento creado con éxito']);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al crear el elemento: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

    // Actualizar un elemento en el inventario
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));

        if (isset($data->tipo_prenda, $data->cantidad_disponible, $data->precio, $data->imagen_url)) {
            try {
                $query = "UPDATE inventario SET tipo_prenda = :tipo_prenda, cantidad_disponible = :cantidad_disponible, precio = :precio, imagen_url = :imagen_url WHERE id = :id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
                $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
                $stmt->bindParam(':precio', $data->precio);
                $stmt->bindParam(':imagen_url', $data->imagen_url);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    echo json_encode(['message' => 'Elemento actualizado con éxito']);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Elemento no encontrado o no se realizaron cambios']);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al actualizar el elemento: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

    // Eliminar un elemento del inventario
    public function delete($id) {
        try {
            $query = "DELETE FROM inventario WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Elemento eliminado con éxito']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Elemento no encontrado']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar el elemento: ' . $e->getMessage()]);
        }
    }
}

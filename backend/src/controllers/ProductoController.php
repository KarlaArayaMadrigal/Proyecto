<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once './src/models/Producto.php';
include_once './src/db/DbConnect.php';

class ProductoController {
    private $db;
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
        $this->db = $this->conn;
    }

    public function index() {
        try {
            $query = "SELECT * FROM productos";
            $stmt = $this->conn->query($query);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener los productos: ' . $e->getMessage()]);
        }
    }

    public function getById($id_producto) {
        try {
            $query = "SELECT * FROM productos WHERE id_producto = :id_producto";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_producto', $id_producto, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Producto no encontrado']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el producto: ' . $e->getMessage()]);
        }
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"));

        if (isset($data->nombre) && isset($data->precio) && isset($data->cantidad)) {
            try {
                $query = "INSERT INTO productos (nombre, precio, cantidad) VALUES (:nombre, :precio, :cantidad)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':nombre', $data->nombre);
                $stmt->bindParam(':precio', $data->precio);
                $stmt->bindParam(':cantidad', $data->cantidad);
                $stmt->execute();

                http_response_code(201);
                echo json_encode(['message' => 'Producto creado con éxito']);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al crear el producto: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

    public function update($id_producto, $data) {
        try {
            $query = "UPDATE productos SET nombre = :nombre, precio = :precio, cantidad = :cantidad WHERE id_producto = :id_producto";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_producto', $id_producto, PDO::PARAM_INT);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':precio', $data['precio']);
            $stmt->bindParam(':cantidad', $data['cantidad']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Producto actualizado con éxito']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Producto no encontrado o no se realizaron cambios']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar el producto: ' . $e->getMessage()]);
        }
    }

    public function delete($id_producto) {
        try {
            $query = "DELETE FROM productos WHERE id_producto = :id_producto";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_producto', $id_producto, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Producto eliminado con éxito']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Producto no encontrado']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar el producto: ' . $e->getMessage()]);
        }
    }
}

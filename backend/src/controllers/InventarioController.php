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

    public function getById($id_inventario) {
        try {
            $query = "SELECT * FROM inventario WHERE id_inventario = :id_inventario"; // Cambiado de 'id' a 'id_inventario'
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_inventario', $id_inventario, PDO::PARAM_INT);
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

    public function create() {
        $data = json_decode(file_get_contents("php://input"));
    
        if (isset($data->tipo_prenda, $data->talla, $data->cantidad_disponible, $data->precio, $data->imagen_url, $data->marca)) { // Asegúrate de incluir 'marca' aquí
            try {
                $query = "INSERT INTO inventario (marca, tipo_prenda, talla, cantidad_disponible, precio, imagen_url) VALUES (:marca, :tipo_prenda, :talla, :cantidad_disponible, :precio, :imagen_url)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':marca', $data->marca); // Asegúrate de que esto esté vinculado
                $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
                $stmt->bindParam(':talla', $data->talla);
                $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
                $stmt->bindParam(':precio', $data->precio);
                $stmt->bindParam(':imagen_url', $data->imagen_url);
                $stmt->execute();
    
                http_response_code(201);
                echo json_encode(['message' => 'Elemento creado con éxito']);
            } catch (PDOException $e) {
                error_log('Error en create: ' . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Error al crear el elemento']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }
    

    public function update($id_inventario) {
        $data = json_decode(file_get_contents("php://input"));
    
        
        error_log(print_r($data, true));
    
        if (isset($data->tipo_prenda, $data->marca, $data->talla, $data->cantidad_disponible, $data->precio, $data->imagen_url)) {
            try {
                $sql = "UPDATE inventario SET marca = :marca, tipo_prenda = :tipo_prenda, talla = :talla, cantidad_disponible = :cantidad_disponible, precio = :precio, imagen_url = :imagen_url WHERE id_inventario = :id_inventario";
                
                $stmt = $this->conn->prepare($sql);
    
                // Vincular parámetros
                $stmt->bindParam(':marca', $data->marca);
                $stmt->bindParam(':tipo_prenda', $data->tipo_prenda);
                $stmt->bindParam(':talla', $data->talla);
                $stmt->bindParam(':cantidad_disponible', $data->cantidad_disponible);
                $stmt->bindParam(':precio', $data->precio);
                $stmt->bindParam(':imagen_url', $data->imagen_url);
                $stmt->bindParam(':id_inventario', $id_inventario);
    
                // Log antes de ejecutar
                error_log("Ejecutando consulta: $sql con ID: $id_inventario");
    
                // Ejecutar la declaración
                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(['message' => 'Inventario actualizado con éxito']);
                } else {
                    http_response_code(500);
                    $errorInfo = $stmt->errorInfo();
                    echo json_encode(['error' => 'Error al actualizar el inventario: ' . $errorInfo[2]]);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al actualizar el inventario: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

    
    public function delete($id_inventario) {
        try {
            $query = "DELETE FROM inventario WHERE id_inventario = :id_inventario";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_inventario', $id_inventario, PDO::PARAM_INT);
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
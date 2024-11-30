<?php
require_once __DIR__ . '/../db/DbConnect.php';


class Inventario {
    private $db;
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function getAllInventario() {
        $query = "SELECT * FROM inventario";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getInventarioById($id) {
        $query = "SELECT * FROM inventario WHERE id_inventario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function buscarInventarioPorTipo($tipo_prenda) {
        $query = "SELECT * FROM inventario WHERE tipo_prenda LIKE :tipo_prenda";
        $stmt = $this->db->prepare($query);
        $tipo_prenda = '%' . $tipo_prenda . '%';
        $stmt->bindParam(':tipo_prenda', $tipo_prenda, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

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

    public function updateInventario($id, $data) {
        try {
            $query = "UPDATE inventario 
                      SET tipo_prenda = :tipo_prenda, cantidad_disponible = :cantidad_disponible, precio = :precio, imagen_url = :imagen_url
                      WHERE id_inventario = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':tipo_prenda', $data['tipo_prenda'], PDO::PARAM_STR);
            $stmt->bindParam(':cantidad_disponible', $data['cantidad_disponible'], PDO::PARAM_INT);
            $stmt->bindParam(':precio', $data['precio'], PDO::PARAM_STR);
            $stmt->bindParam(':imagen_url', $data['imagen_url'], PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            
            if ($stmt->execute()) {
                return ["success" => true, "message" => "Producto actualizado exitosamente"];
            } else {
                return ["success" => false, "message" => "No se pudo actualizar el producto"];
            }
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
    

    public function deleteInventario($id) {
        $query = "DELETE FROM inventario WHERE id_inventario = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }
}

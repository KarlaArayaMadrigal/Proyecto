<?php
require_once __DIR__ . '/../db/DbConnect.php';


class Producto {
    private $db;
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function getAllProductos() {
        $query = "SELECT * FROM productos";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductoById($id_producto) {
        $query = "SELECT * FROM productos WHERE id_producto = :id_producto";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id_producto, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function buscarProductoPorMarca($marca) {
        $query = "SELECT * FROM productos WHERE marca LIKE :marca";
        $stmt = $this->db->prepare($query);
        $tipo_prenda = '%' . $marca . '%';
        $stmt->bindParam(':marca', $marca, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createProducto($data) {
        $query = "INSERT INTO producto (marca, articulo, talla, precio, imagen_url) 
                  VALUES (:marca, :articulo, :talla, :precio, :imagen_url)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':marca', $data['marca'], PDO::PARAM_STR);
        $stmt->bindParam(':articulo', $data['articulo'], PDO::PARAM_INT);
        $stmt->bindParam(':talla', $data['talla'], PDO::PARAM_STR);
        $stmt->bindParam(':precio', $data['precio'], PDO::PARAM_STR);
        $stmt->bindParam(':imagen_url', $data['imagen'], PDO::PARAM_STR);
        $stmt->execute();
    }

    
}

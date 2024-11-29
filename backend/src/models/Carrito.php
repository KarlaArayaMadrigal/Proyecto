<?php
require_once __DIR__ . '/../db/DbConnect.php';

class Carrito {
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    
    public function agregarAlCarrito($productos, $id_venta) {
        try {
            
            foreach ($productos as $producto) {
                $query = "INSERT INTO carrito (id_producto, id_marca, id_venta, precio, imagen_url, cantidad_disponible, tipo_prenda) 
                          VALUES (:id_producto, :id_marca, :id_venta, :precio, :imagen_url, :cantidad_disponible, :tipo_prenda)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id_producto', $producto['id_producto'], PDO::PARAM_INT);
                $stmt->bindParam(':id_marca', $producto['id_marca'], PDO::PARAM_INT);
                $stmt->bindParam(':id_venta', $id_venta, PDO::PARAM_INT); // Asumimos que se recibe el id_venta
                $stmt->bindParam(':precio', $producto['precio'], PDO::PARAM_STR);
                $stmt->bindParam(':imagen_url', $producto['imagen_url'], PDO::PARAM_STR);
                $stmt->bindParam(':cantidad_disponible', $producto['cantidad_disponible'], PDO::PARAM_INT);
                $stmt->bindParam(':tipo_prenda', $producto['tipo_prenda'], PDO::PARAM_STR);
                $stmt->execute();
            }
            return ["status" => "success", "message" => "Productos agregados al carrito"];
        } catch (Exception $e) {
            return ["status" => "error", "message" => "Error al agregar productos al carrito: " . $e->getMessage()];
        }
    }

    public function obtenerProductoPorId($id_producto) {
        $query = "SELECT precio, tipo_prenda, imagen_url, id_marca FROM productos WHERE id_producto = :id"; // Ajusta según tu estructura
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id_producto, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
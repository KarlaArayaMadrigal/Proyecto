<?php
class Venta {
    private $db;

    public function __construct() {
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=tienda_luka', 'root', 'admin');
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Error de conexión: ' . $e->getMessage();
            exit;
        }
    }

    // Método para obtener todas las ventas
    public function obtenerVentas() {
        $query = "SELECT * FROM ventas";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obtener una venta por su ID
    public function obtenerVentaPorId($id) {
        $query = "SELECT * FROM ventas WHERE id_venta = :id_venta";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id_venta', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Método para crear una nueva venta
    public function crearVenta($id_usuario, $precio, $id_inventario, $tipo_prenda, $cantidad) {
        $query = "INSERT INTO ventas (id_usuario, precio, id_inventario, tipo_prenda, cantidad) VALUES (:id_usuario, :precio, :id_inventario, :tipo_prenda, :cantidad)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':id_inventario', $id_inventario);
        $stmt->bindParam(':tipo_prenda', $tipo_prenda);
        $stmt->bindParam(':cantidad', $cantidad);
        return $stmt->execute();
    }

    // Método para eliminar una venta por su ID
    public function eliminarVenta($id) {
        $query = "DELETE FROM ventas WHERE id_venta = :id_venta";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id_venta', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}

?>


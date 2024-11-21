<?php
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

class Venta {
    private $db;

    public function __construct() {
        $this->db = DbConnect::getInstance();
    }

    // Método para crear una nueva venta
    public function crearVenta($id_usuario, $total, $productos) {
        try {
            // Inicia una transacción
            $this->db->beginTransaction();

            // Insertar la venta en la tabla ventas
            $query = "INSERT INTO ventas (id_usuario, total) VALUES (:id_usuario, :total)";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
            $stmt->bindParam(':total', $total, PDO::PARAM_STR);  // Asegurarse de que el total sea un string
            $stmt->execute();

            // Obtener el ID de la venta recién insertada
            $venta_id = $this->db->lastInsertId();

            // Insertar los productos en la tabla detalle_ventas
            foreach ($productos as $producto) {
                $query = "INSERT INTO detalle_ventas (id_venta, id_producto, cantidad) 
                          VALUES (:id_venta, :id_producto, :cantidad)";
                $stmt = $this->db->prepare($query);
                $stmt->bindParam(':id_venta', $venta_id, PDO::PARAM_INT);
                $stmt->bindParam(':id_producto', $producto['id_producto'], PDO::PARAM_INT);
                $stmt->bindParam(':cantidad', $producto['cantidad'], PDO::PARAM_INT);
                $stmt->execute();
            }

            // Si todo va bien, confirma la transacción
            $this->db->commit();

            // Devuelve el ID de la venta creada
            return $venta_id;
        } catch (Exception $e) {
            // Si ocurre algún error, revierte la transacción
            $this->db->rollBack();
            throw $e;  // Lanza el error para que se pueda manejar en otro lugar
        }
    }

    // Obtener todas las ventas
    public function obtenerVentas() {
        $query = "SELECT * FROM ventas";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener una venta por su ID
    public function obtenerVentaPorId($id) {
        $query = "SELECT * FROM ventas WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Eliminar una venta por su ID
    public function eliminarVenta($id) {
        $query = "DELETE FROM ventas WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }
}
?>


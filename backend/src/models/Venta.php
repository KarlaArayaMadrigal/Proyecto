<?php
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);        

class Venta {
    
    private $db;

    public function __construct() {
        try {
            // Intenta conectar con la base de datos
            $this->db = new PDO('mysql:host=localhost;dbname=tienda_luka', 'root', 'admin');
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            
            echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
            exit;
        }
    }

    // Método para obtener todas las ventas
    public function obtenerVentas() {
        try {
            $query = "SELECT * FROM ventas";
            $stmt = $this->db->query($query);
            $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if (!$ventas) {
                return json_encode(['ventas' => [], 'message' => 'No se encontraron ventas.']);
            }
    
            return json_encode($ventas);  
        } catch (PDOException $e) {
            return json_encode(['error' => 'Error al obtener ventas: ' . $e->getMessage()]);
        }
    }

    // Método para obtener una venta por su ID
    public function obtenerVentaPorId($id) {
        try {
            $query = "SELECT * FROM ventas WHERE id_venta = :id_venta";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id_venta', $id, PDO::PARAM_INT);
            $stmt->execute();
            $venta = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$venta) {
                return json_encode(['error' => "No se encontró la venta con ID: $id."]);
            }

            return json_encode($venta);
        } catch (PDOException $e) {
            return json_encode(['error' => 'Error al obtener la venta: ' . $e->getMessage()]);
        }
    }

    // Método para crear una nueva venta
    public function crearVenta($id_usuario, $precio, $id_inventario, $tipo_prenda, $cantidad) {
        try {
            $query = "INSERT INTO ventas (id_usuario, precio, id_inventario, tipo_prenda, cantidad) VALUES (:id_usuario, :precio, :id_inventario, :tipo_prenda, :cantidad)";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->bindParam(':precio', $precio);
            $stmt->bindParam(':id_inventario', $id_inventario);
            $stmt->bindParam(':tipo_prenda', $tipo_prenda);
            $stmt->bindParam(':cantidad', $cantidad);

            if ($stmt->execute()) {
                return json_encode(['success' => true, 'message' => 'Venta creada con éxito.']);
            } else {
                return json_encode(['error' => 'Error al crear la venta.']);
            }
        } catch (PDOException $e) {
            return json_encode(['error' => 'Error al crear la venta: ' . $e->getMessage()]);
        }
    }

    // Método para eliminar una venta por su ID
    public function eliminarVenta($id) {
        try {
            $query = "DELETE FROM ventas WHERE id_venta = :id_venta";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id_venta', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return json_encode(['success' => true, 'message' => "Venta con ID $id eliminada con éxito."]);
            } else {
                return json_encode(['error' => "Error al eliminar la venta con ID: $id."]);
            }
        } catch (PDOException $e) {
            return json_encode(['error' => 'Error al eliminar la venta: ' . $e->getMessage()]);
        }
    }
}
?>


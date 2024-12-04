<?php
require_once __DIR__ . '/../db/DbConnect.php';

class Venta
{
    private $conn;
    private $table = 'ventas';

    public $id_venta;
    public $marca;
    public $precio;
    public $id_inventario;
    public $tipo_prenda;
    public $cantidad;
    public $fecha;

    // Constructor
    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function getAll()
    {
        $sql = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($sql);

        if (!$stmt->execute()) {
            return [];
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function getById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id_venta = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
{
    
    $requiredFields = ['marca', 'precio', 'id_inventario', 'tipo_prenda', 'cantidad'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("El campo '$field' es obligatorio.");
        }
    }

    $query = "INSERT INTO " . $this->table . " (marca, precio, id_inventario, tipo_prenda, cantidad) 
              VALUES (:marca, :precio, :id_inventario, :tipo_prenda, :cantidad)";
    $stmt = $this->conn->prepare($query);

    // Asignar valores
    $stmt->bindParam(':marca', $data['marca'], PDO::PARAM_STR);
    $stmt->bindParam(':precio', $data['precio'], PDO::PARAM_STR);
    $stmt->bindParam(':id_inventario', $data['id_inventario'], PDO::PARAM_INT);
    $stmt->bindParam(':tipo_prenda', $data['tipo_prenda'], PDO::PARAM_STR);
    $stmt->bindParam(':cantidad', $data['cantidad'], PDO::PARAM_INT);

    error_log(print_r($data, true));
    try {
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
    } catch (PDOException $e) {
        error_log("Error al crear la venta: " . $e->getMessage()); 
        throw new Exception("Error al crear la venta: " . $e->getMessage());
    }

    return false; 
}

    public function update()
    {
        // Validar datos
        if (empty($this->id_venta) || empty($this->marca) || empty($this->precio) || empty($this->id_inventario) || empty($this->tipo_prenda) || empty($this->cantidad)) {
            throw new Exception("Todos los campos son obligatorios.");
        }

        $query = "UPDATE " . $this->table . " 
                  SET marca = :marca, precio = :precio, id_inventario = :id_inventario, 
                      tipo_prenda = :tipo_prenda, cantidad = :cantidad 
                  WHERE id_venta = :id_venta";

        $stmt = $this->conn->prepare($query);

       
        $stmt->bindParam(':marca', $this->marca, PDO::PARAM_STR);
        $stmt->bindParam(':precio', $this->precio, PDO::PARAM_STR);
        $stmt->bindParam(':id_inventario', $this->id_inventario, PDO::PARAM_INT);
        $stmt->bindParam(':tipo_prenda', $this->tipo_prenda, PDO::PARAM_STR);
        $stmt->bindParam(':cantidad', $this->cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':id_venta', $this->id_venta, PDO::PARAM_INT);

        try {
            return $stmt->execute(); 
        } catch (Exception $e) {
            throw new Exception("Error al actualizar la venta: " . $e->getMessage());
        }
    }

    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id_venta = :id_venta";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_venta', $id, PDO::PARAM_INT);

        try {
            return $stmt->execute(); 
        } catch (Exception $e) {
            throw new Exception("Error al eliminar la venta: " . $e->getMessage());
        }
    }
}

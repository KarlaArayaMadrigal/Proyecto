<?php
require_once __DIR__ . '/../db/DbConnect.php';

class Venta
{
    private $conn;
    private $table = 'ventas';

    public $id_venta;
    public $precio;
    public $tipo_prenda;
    public $cantidad;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    // Obtener todas las ventas
    public function getAll()
    {
        $sql = "SELECT * FROM " . $this->table;  // Reemplaza esto por tu consulta real
        $stmt = $this->conn->prepare($sql);
        
        // Manejo de errores
        if (!$stmt->execute()) {
            return []; // O maneja el error de acuerdo a tus necesidades
        }

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Eliminar var_dump para evitar salida no válida
        return $result ?: [];  // Si no hay resultados, devuelve un arreglo vacío
    }

    // Obtener una venta por ID
    public function getById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id_venta = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear una nueva venta
    public function create()
    {
        $query = "INSERT INTO " . $this->table . " (precio, tipo_prenda, cantidad) 
                  VALUES (:precio, :tipo_prenda, :cantidad)";

        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->precio = htmlspecialchars(strip_tags($this->precio));
        $this->tipo_prenda = htmlspecialchars(strip_tags($this->tipo_prenda));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));

        // Enlazar parámetros
        $stmt->bindParam(':precio', $this->precio, PDO::PARAM_STR);
        $stmt->bindParam(':tipo_prenda', $this->tipo_prenda, PDO::PARAM_STR);
        $stmt->bindParam(':cantidad', $this->cantidad, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Actualizar una venta
    public function update()
    {
        $query = "UPDATE " . $this->table . " 
                  SET precio = :precio, tipo_prenda = :tipo_prenda, cantidad = :cantidad 
                  WHERE id_venta = :id_venta";

        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->precio = htmlspecialchars(strip_tags($this->precio));
        $this->tipo_prenda = htmlspecialchars(strip_tags($this->tipo_prenda));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        $this->id_venta = htmlspecialchars(strip_tags($this->id_venta));

        // Enlazar parámetros
        $stmt->bindParam(':precio', $this->precio, PDO::PARAM_STR);
        $stmt->bindParam(':tipo_prenda', $this->tipo_prenda, PDO::PARAM_STR);
        $stmt->bindParam(':cantidad', $this->cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':id_venta', $this->id_venta, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Eliminar una venta
    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id_venta = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        return $stmt->execute();
    }
}

<?php
class Marca
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db; 
    }

    public function getMarcasConVentas()
    {
        $query = "SELECT DISTINCT marca
                  FROM ventas
                  WHERE cantidad > 0;";
        $stmt = $this->db->prepare($query);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

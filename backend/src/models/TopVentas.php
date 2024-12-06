<?php
class TopVentas
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getTopVentas()
{
    try {
        $query = "
    SELECT 
        `tienda_luka`.`ventas`.`marca` AS `marca`,
        SUM(`tienda_luka`.`ventas`.`cantidad`) AS `total_ventas`
    FROM 
        `tienda_luka`.`ventas`
    GROUP BY 
        `tienda_luka`.`ventas`.`marca`
    ORDER BY 
        `total_ventas` DESC
    LIMIT 5
";
 
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return ["error" => "Error al obtener datos: " . $e->getMessage()];
    }
}
}
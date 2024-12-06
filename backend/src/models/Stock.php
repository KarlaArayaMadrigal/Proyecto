<?php
class Stock
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db; 
    }

    public function getStock()
{
    try {
        $query = "select `i`.`id_inventario` AS `id_inventario`,`i`.`marca` AS `marca`,`i`.`tipo_prenda` AS `tipo_prenda`,`i`.`talla` AS `talla`,`i`.`precio` AS `precio_unitario`,sum(`v`.`cantidad`) AS `cantidad_vendida`,(`i`.`cantidad_disponible` - sum(`v`.`cantidad`)) AS `cantidad_restante` from (`tienda_luka`.`ventas` `v` join `tienda_luka`.`inventario` `i` on((`v`.`id_inventario` = `i`.`id_inventario`))) group by `i`.`id_inventario`,`i`.`marca`,`i`.`tipo_prenda`,`i`.`talla`,`i`.`precio`,`i`.`cantidad_disponible`"; 
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Manejo de errores
        return ["error" => "Error al obtener datos: " . $e->getMessage()];
    }
}
}

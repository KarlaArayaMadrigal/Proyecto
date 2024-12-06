<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once './src/models/Marca.php';
include_once './src/db/DbConnect.php';

class MarcasController {
    private $db;
    private $conn;
    private $marcaModel;

    public function __construct() {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
        $this->db = $this->conn;
        $this->marcaModel = new Marca($this->db); 
    }

    public function index() {
        try {
            $marcasConVentas = $this->marcaModel->getMarcasConVentas();

            if ($marcasConVentas && count($marcasConVentas) > 0) {
                http_response_code(200);
                echo json_encode($marcasConVentas);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'No se encontraron marcas con ventas.']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error al procesar la solicitud.', 'error' => $e->getMessage()]);
        }
    }
}

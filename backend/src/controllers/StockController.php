<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once './src/models/Stock.php';
include_once './src/db/DbConnect.php';

class StockController {
    private $db;
    private $conn;
    private $stockModel;

    public function __construct() {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
        $this->db = $this->conn;
        $this->stockModel = new Stock($this->db); 
    }

    public function index() {
        $data = $this->stockModel->getStock();
    
        if (isset($data['error'])) {
            http_response_code(500);
            echo json_encode(["message" => $data['error']]);
        } elseif (!empty($data)) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "No se encontraron registros."]);
        }
    }
}

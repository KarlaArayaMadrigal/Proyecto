<?php
require_once './src/models/Carrito.php';
require_once './src/models/Venta.php';
include_once './src/db/DbConnect.php';

class CarritoController {
    private $model;
    private $ventaModel;

    public function __construct() {
        $this->model = new Carrito();
        $this->ventaModel = new Venta();
    }

    public function agregarAlCarrito() {
        
        $data = json_decode(file_get_contents('php://input'), true);
    
       
        if (isset($data['id_usuario'], $data['productos'])) {
            
            $id_venta = $this->ventaModel->create($data['productos']); 
    
            
            if (!$id_venta) {
                http_response_code(500);
                echo json_encode(['error' => 'No se pudo crear la venta']);
                return;
            }
    
            
            $response = $this->model->agregarAlCarrito($data['productos'], $id_venta);
            echo json_encode($response);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }
    
}

?>

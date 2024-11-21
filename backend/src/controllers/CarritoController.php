<?php
require_once './models/Carrito.php';
include_once '../db/DbConnect.php';

class CarritoController {
    private $model;

    public function __construct() {
        $this->model = new Carrito();
    }

    public function agregarAlCarrito() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['id_usuario'], $data['id_producto'], $data['cantidad'])) {
            $this->model->agregarAlCarrito($data['id_usuario'], $data['id_producto'], $data['cantidad']);
            echo json_encode(['message' => 'Producto agregado al carrito con éxito']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

}
?>

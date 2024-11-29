<?php
require_once './src/models/Carrito.php';
require_once './src/models/Venta.php'; // Asegúrate de incluir el modelo de Venta
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
            // Aquí deberías crear una venta y obtener el id_venta
            $id_venta = $this->ventaModel->create(); // Asegúrate de que este método devuelva el ID de la venta

            if (!$id_venta) {
                http_response_code(500);
                echo json_encode(['error' => 'No se pudo crear la venta']);
                return;
            }

            // Agregar al carrito
            $response = $this->model->agregarAlCarrito($data['productos'], $id_venta);
            echo json_encode($response);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }
}
?>

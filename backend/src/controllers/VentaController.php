<?php
require_once './models/VentaModel.php';

class VentaController {
    private $model;

    public function __construct() {
        $this->model = new Venta();
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['id_usuario'], $data['total'], $data['productos'])) {
            $this->model->crearVenta($data['id_usuario'], $data['total'], $data['productos']);
            echo json_encode(['message' => 'Venta creada con éxito']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

    public function getVentas() {
        $ventas = $this->model->obtenerVentas();
        echo json_encode($ventas);
    }

    public function getVentaById($id) {
        $venta = $this->model->obtenerVentaPorId($id);
        echo json_encode($venta);
    }

    public function deleteVenta($id) {
        $this->model->eliminarVenta($id);
        echo json_encode(['message' => 'Venta eliminada con éxito']);
    }
}
?>

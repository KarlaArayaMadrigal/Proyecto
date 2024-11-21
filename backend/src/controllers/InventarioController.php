<?php
include_once '../db/DbConnect.php';
require_once './models/InventarioModel.php';

class InventarioController {
    private $model;

    public function __construct() {
        $this->model = new Inventario();
    }

    public function getAll() {
        $data = $this->model->getAllInventario();
        echo json_encode($data);
    }

    public function getById($id) {
        $data = $this->model->getInventarioById($id);
        echo json_encode($data);
    }

    public function buscarPorTipo($tipo_prenda) {
        $data = $this->model->buscarInventarioPorTipo($tipo_prenda);
        echo json_encode($data);
    }

    public function create() {
        $input = json_decode(file_get_contents('php://input'), true);
        $this->model->createInventario($input);
        echo json_encode(['status' => 'success']);
    }

    public function update($id, $data) {
        $this->model->updateInventario($id, $data);
        echo json_encode(['status' => 'success']);
    }

    public function delete($id) {
        $this->model->deleteInventario($id);
        echo json_encode(['status' => 'success']);
    }
}
?>

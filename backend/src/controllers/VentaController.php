<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permite solicitudes desde el frontend
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas

require_once '../models/Venta.php';

class VentaController {
    private $model;

    public function __construct() {
        $this->model = new Venta();
    }

    // Método para obtener todas las ventas
    public function obtenerVentas() {
        $ventas = $this->model->obtenerVentas();

        if ($ventas) {
            echo json_encode($ventas);
        } else {
            echo json_encode(['message' => 'No se encontraron ventas']);
        }
    }

    // Método para obtener una venta por su ID
    public function obtenerVentaPorId($id) {
        $venta = $this->model->obtenerVentaPorId($id);
        echo json_encode($venta); // Devuelve la venta en formato JSON
    }

    // Método para crear una venta
    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['id_usuario'], $data['precio'], $data['id_inventario'], $data['tipo_prenda'], $data['cantidad'])) {
            $id_usuario = $data['id_usuario'];
            $precio = $data['precio'];
            $id_inventario = $data['id_inventario'];
            $tipo_prenda = $data['tipo_prenda'];
            $cantidad = $data['cantidad'];

            $resultado = $this->model->crearVenta($id_usuario, $precio, $id_inventario, $tipo_prenda, $cantidad);

            if ($resultado) {
                echo json_encode(['message' => 'Venta creada con éxito']);
            } else {
                echo json_encode(['message' => 'Error al crear la venta']);
            }
        } else {
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

    // Método para eliminar una venta por su ID
    public function eliminarVenta($id) {
        $resultado = $this->model->eliminarVenta($id);
        if ($resultado) {
            echo json_encode(['message' => 'Venta eliminada con éxito']);
        } else {
            echo json_encode(['message' => 'Error al eliminar la venta']);
        }
    }
}
?>




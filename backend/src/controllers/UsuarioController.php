<?php
try {
    $this->connection = new PDO("mysql:host=localhost;dbname=tienda_luka", "root", "admin");
    $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}


class UsuarioController {
    private $model;

    public function __construct() {
        $this->model = new Usuario();
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['nombre'], $data['correo'], $data['password'])) {
            $this->model->crearUsuario($data['nombre'], $data['correo'], $data['password']);
            echo json_encode(['message' => 'Usuario creado con éxito']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }

}
?>

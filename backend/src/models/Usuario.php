<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once __DIR__ . '/../db/DbConnect.php';

// Clase para manejar usuarios
class Usuario {
    private $db;
    private $conn;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function crearUsuario($nombre, $correo, $password) {
        try {
            $query = "INSERT INTO usuarios (nombre, correo, password) VALUES (:nombre, :correo, :password)";
            $stmt = $this->db->prepare($query);

            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
            $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
            $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

            $stmt->execute();
            http_response_code(200);
            echo json_encode(["message" => "Usuario registrado con éxito"]);
        } catch (PDOException $e) {
            error_log("Error al crear usuario: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(["error" => "Error al crear usuario"]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit();
}


$data = json_decode(file_get_contents("php://input"));


if (isset($data->nombre, $data->correo, $data->password)) {
    if (empty($data->nombre) || empty($data->correo) || empty($data->password)) {
        http_response_code(400);
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit();
    }

    if (!filter_var($data->correo, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Correo inválido"]);
        exit();
    }

    $usuario = new Usuario();
    $usuario->crearUsuario($data->nombre, $data->correo, $data->password);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos. Por favor, envíe todos los campos requeridos"]);
}
?>

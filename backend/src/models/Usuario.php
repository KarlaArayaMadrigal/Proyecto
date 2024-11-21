<?php
// Habilitar la visualización de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Permitir CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

class DbConnect {
    private static $instance = null;
    private $connection;

    private function __construct() {
        try {
            $this->connection = new PDO("mysql:host=localhost;dbname=tienda_luka", "root", "admin");
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
            exit();
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new DbConnect();
        }
        return self::$instance->connection;
    }
}

class Usuario {
    private $db;

    public function __construct() {
        $this->db = DbConnect::getInstance();
    }

    public function crearUsuario($nombre, $correo, $password) {
        try {
            $query = "INSERT INTO usuarios (nombre, correo, password) VALUES (:nombre, :correo, :password)";
            $stmt = $this->db->prepare($query);

            // Crear una variable para almacenar el hash
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
            $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
            $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

            $stmt->execute();
            
            echo json_encode(["message" => "Usuario registrado con éxito"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al crear usuario: " . $e->getMessage()]);
        }
    }
}

// Leer entrada de datos JSON
$data = json_decode(file_get_contents("php://input"));

// Validar los datos
if (isset($data->nombre, $data->correo, $data->password)) {
    if (empty($data->nombre) || empty($data->correo) || empty($data->password)) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit();
    }

    if (!filter_var($data->correo, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Correo inválido"]);
        exit();
    }

    $usuario = new Usuario();
    $usuario->crearUsuario($data->nombre, $data->correo, $data->password);
} else {
    echo json_encode(["error" => "Faltan datos. Por favor, envíe todos los campos requeridos"]);
}
?>

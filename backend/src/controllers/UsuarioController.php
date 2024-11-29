<?php

require_once './src/models/Usuario.php';
include_once './src/db/DbConnect.php';

class UsuarioController {
    private $db;
    private $conn;
    private $model;

    public function __construct()
    {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
    
        if (isset($data['nombre'], $data['correo'], $data['password'])) {
            $nombre = $data['nombre'];
            $correo = $data['correo'];
            $password = $data['password'];
    
            $this->model->crearUsuario($nombre, $correo, $password);
    
            echo json_encode(['message' => 'Usuario creado con éxito']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
        }
    }
    
}


<?php
class DbConnect {
    private $host = 'localhost';
    private $dbName = 'tienda_luka';
    private $username = 'root';
    private $password = 'admin';
    private $conn;
    public function getConnection() {
        // Establecer la conexión a la base de datos utilizando PDO
        if ($this->conn === null) {
            try {
                $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbName", $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo "Error de conexión: " . $e->getMessage();
                die();
            }
        }
        return $this->conn;
    }
}


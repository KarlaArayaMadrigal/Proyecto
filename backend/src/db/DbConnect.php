<?php

class DbConnect {
    private static $instance = null;
    private $connection;

    // Constructor privado para prevenir la creación de instancias desde fuera
    private function __construct() {
        try {
            // Cambia estos valores según tu configuración
            $host = 'localhost';
            $dbName = 'tienda_luka'; 
            $user = 'root'; 
            $password = 'admin'; 

            // Estableciendo la conexión usando PDO
            $dsn = "mysql:host=$host;dbname=$dbName";
            $this->connection = new PDO($dsn, $user, $password);

            // Establecer el modo de error a excepción
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            // En caso de error, muestra un mensaje y termina la ejecución
            die('Error de conexión: ' . $e->getMessage());
        }
    }

    // Método para obtener la instancia única de la clase
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new DbConnect();
        }
        return self::$instance;
    }

    // Método para obtener la conexión PDO
    public function getConnection() {
        return $this->connection;
    }
}

?>


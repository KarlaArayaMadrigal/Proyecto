<?php
class DbConnect {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $this->connection = new PDO("mysql:host=localhost;dbname=tienda_luka", "root", "admin");
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new DbConnect();
        }
        return self::$instance->connection;
    }
}

class Carrito {
    private $db;

    public function __construct() {
        $this->db = DbConnect::getInstance()->getConnection();
    }

    // Este método recibe los productos del carrito y los guarda en la base de datos.
    public function agregarAlCarrito($productos) {
        try {
            // Insertar cada producto en la tabla carrito (asegurate de que esta tabla exista en tu base de datos)
            foreach ($productos as $producto) {
                $query = "INSERT INTO carrito (id_inventario, cantidad) VALUES (:id_inventario, :cantidad)";
                $stmt = $this->db->prepare($query);
                $stmt->bindParam(':id_inventario', $producto['id_inventario'], PDO::PARAM_INT);
                $stmt->bindParam(':cantidad', $producto['cantidad'], PDO::PARAM_INT);
                $stmt->execute();
            }
            return ["status" => "success", "message" => "Productos agregados al carrito"];
        } catch (Exception $e) {
            return ["status" => "error", "message" => "Error al agregar productos al carrito: " . $e->getMessage()];
        }
    }
}

// Verifica si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados en el cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Asegúrate de que los datos sean válidos
    if (isset($data['productos'])) {
        $productos = $data['productos'];

        // Crea una instancia del modelo CarritoModel y agrega los productos
        $carritoModel = new Carrito();
        $response = $carritoModel->agregarAlCarrito($productos);

        echo json_encode($response);
    } else {
        echo json_encode(["status" => "error", "message" => "No se recibieron productos"]);
    }
}
?>

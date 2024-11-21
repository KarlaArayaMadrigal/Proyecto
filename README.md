# Proyecto Luka: Tienda de Comercio Electrónico

**Luka** es una tienda de comercio electrónico dedicada a la venta de ropa y accesorios de moda. Su plataforma está diseñada para proporcionar a los clientes una experiencia de compra en línea fluida y atractiva, adaptándose a las tendencias del mercado y a las preferencias de los consumidores.

---

## **Integrantes del Proyecto**
- **Karla Daniela Araya Madrigal**  
- **Luis Gerardo Herrera Gamboa**

---

## **Diagrama de Flujo**
![image](https://github.com/user-attachments/assets/6e8f899e-467d-4b76-8dab-5816b79c58c1)

---

**EndPoints**

### **1. Inventario**  
Base Endpoint: `/inventario`

- **GET `/inventario`**  
  Obtener todos los productos del inventario.  
  **Parámetros o Cuerpo:** Ninguno.

- **GET `/inventario?id_inventario=1`**  
  Obtener un producto por su ID.  
  **Parámetros:**  
  - `id_inventario` (en la URL).

- **GET `/inventario?tipo_prenda=camisa`**  
  Buscar productos por tipo de prenda.  
  **Parámetros:**  
  - `tipo_prenda` (en la URL).

- **POST `/inventario`**  
  Crear un nuevo producto en el inventario.  
  **Cuerpo JSON:**  
  {
    "id_marca": 1,
    "tipo_prenda": "camisa",
    "cantidad_disponible": 10,
    "precio": 5000,
    "imagen_url": "image.jpg"
  }
PUT /inventario?id_inventario=1
Actualizar un producto por ID.
Parámetros:

id_inventario (en la URL).
Cuerpo JSON:

{
  "id_marca": 1,
  "tipo_prenda": "camisa",
  "cantidad_disponible": 8,
  "precio": 4500,
  "imagen_url": "new_image.jpg"
}
DELETE /inventario?id_inventario=1
Eliminar un producto por su ID.
Parámetros:

id_inventario (en la URL).
2. Carrito
Base Endpoint: /carrito

POST /carrito
Agregar un producto al carrito.
Cuerpo JSON:

{
  "id_producto": 1,
  "id_marca": 2,
  "cantidad": 3,
  "precio": 5000,
  "imagen_url": "image.jpg",
  "tipo_prenda": "camisa"
}
GET /carrito
Obtener los productos del carrito.
Parámetros o Cuerpo: Ninguno.

PUT /carrito
Actualizar la cantidad de un producto en el carrito.
Cuerpo JSON:

{
  "id_producto": 1,
  "cantidad": 5
}
DELETE /carrito?id_producto=1
Eliminar un producto del carrito por ID.
Parámetros:

id_producto (en la URL).
3. Venta
Base Endpoint: /venta

POST /venta
Registrar una nueva venta.
Cuerpo JSON:

{
  "id_inventario": 1,
  "tipo_prenda": "camisa",
  "precio": 5000,
  "cantidad": 2
}
GET /venta
Obtener todas las ventas.
Parámetros o Cuerpo: Ninguno.

GET /venta?id_venta=1
Obtener una venta por ID.
Parámetros:

id_venta (en la URL).
4. Usuario
Base Endpoint: /usuario

POST /usuario
Crear un nuevo usuario.
Cuerpo JSON:

{
  "nombre": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
GET /usuario
Obtener todos los usuarios.
Parámetros o Cuerpo: Ninguno.

GET /usuario?id=1
Obtener un usuario por ID.
Parámetros:

id (en la URL).
PUT /usuario?id=1
Actualizar un usuario existente.
Parámetros:

id (en la URL).
Cuerpo JSON:

{
  "nombre": "John Smith",
  "email": "john.smith@example.com",
  "password": "newpassword"
}
DELETE /usuario?id=1
Eliminar un usuario por ID.
Parámetros:

id (en la URL).


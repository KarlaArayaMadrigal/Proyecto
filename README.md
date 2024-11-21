# Proyecto
Luka es una tienda de comercio electrónico dedicada a la venta de ropa y accesorios de moda. Su plataforma está diseñada para proporcionar a los clientes una experiencia de compra en línea fluida y atractiva, adaptándose a las tendencias del mercado y a las preferencias de los consumidores.

Integrantes:
Karla Daniela Araya Madrigal
Luis Gerardo Herrera Gamboa

Diagrama de Flujo:

![image](https://github.com/user-attachments/assets/6e8f899e-467d-4b76-8dab-5816b79c58c1)

EndPoints 

1. Inventario

Base endpoint: /inventario
Método HTTP
Endpoint
Descripción
Parámetros o cuerpo esperado
GET
/inventario
Obtener todos los productos del inventario
Ninguno
GET
/inventario?id_inventario=1
Obtener un producto por su ID
Parámetro en la URL: id_inventario
GET
/inventario?tipo_prenda=camisa
Buscar productos por tipo de prenda
Parámetro en la URL: tipo_prenda
POST
/inventario
Crear un nuevo producto en el inventario
json { "id_marca": 1, "tipo_prenda": "camisa", "cantidad_disponible": 10, "precio": 5000, "imagen_url": "image.jpg" }
PUT
/inventario?id_inventario=1
Actualizar un producto por ID
json { "id_marca": 1, "tipo_prenda": "camisa", "cantidad_disponible": 8, "precio": 4500, "imagen_url": "new_image.jpg" }
DELETE
/inventario?id_inventario=1
Eliminar un producto por su ID
Parámetro en la URL: id_inventario


2. Carrito

Base endpoint: /carrito
Método HTTP
Endpoint
Descripción
Parámetros o cuerpo esperado
POST
/carrito
Agregar un producto al carrito
json { "id_producto": 1, "id_marca": 2, "cantidad": 3, "precio": 5000, "imagen_url": "image.jpg", "tipo_prenda": "camisa" }
GET
/carrito
Obtener los productos del carrito
Ninguno
PUT
/carrito
Actualizar la cantidad de un producto en el carrito
json { "id_producto": 1, "cantidad": 5 }
DELETE
/carrito?id_producto=1
Eliminar un producto del carrito por ID
Parámetro en la URL: id_producto


3. Venta

Base endpoint: /venta
Método HTTP
Endpoint
Descripción
Parámetros o cuerpo esperado
POST
/venta
Registrar una nueva venta
json { "id_inventario": 1, "tipo_prenda": "camisa", "precio": 5000, "cantidad": 2 }
GET
/venta
Obtener todas las ventas
Ninguno
GET
/venta?id_venta=1
Obtener una venta por ID
Parámetro en la URL: id_venta


4. Usuario

Base endpoint: /usuario
Método HTTP
Endpoint
Descripción
Parámetros o cuerpo esperado
POST
/usuario
Crear un nuevo usuario
json { "nombre": "John Doe", "email": "john@example.com", "password": "securepassword" }
GET
/usuario
Obtener todos los usuarios
Ninguno
GET
/usuario?id=1
Obtener un usuario por ID
Parámetro en la URL: id
PUT
/usuario?id=1
Actualizar un usuario existente
json { "nombre": "John Smith", "email": "john.smith@example.com", "password": "newpassword" }
DELETE
/usuario?id=1
Eliminar un usuario por ID
Parámetro en la URL: id



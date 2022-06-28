# backend-project-uno

Proyecto Backend de la materia Taller de Programación II

Grupo 1   |   Curso: Belgrano C   |   Profesor: Pablo Fernandez Hinojosa
Integrantes: Cristian Esem - Victor Lacco - Diego Ponzo - Julian Perini - Martin Chab

Nombre de la Aplicación: pick-app

Definición del proyecto:
Se trata de una API, desde la cual permite a una aplicacion mobile (frontend), acceder a recursos de una base de datos.
Dicha aplicacion es parte del proyecto de la materia Programación de Nuevas Tecnologías II, desde la cual se pueden realizar pedidos de manera online.

En la base de datos MongoDB, se encuentran almacenados los productos, los usuarios registrados y las compras realizadas por los usuarios.

Instalacion:
    - npm install
    - npm run start-dev

Los endpoints disponibles para el frontend son:

Productos:
    -lista de todos los productos con stock
    GET: /api/products

    -lista de todos los productos con stock por una categoria especifica
    GET: /api/products/Category/:category

    -lista de un producto por id
    GET: /api/products/:id

    -Agregar un producto nuevo
    POST: /api/products

    -Bajar el stock por una venta de producto en particular
    PUT: /api/products/:id

    -Actualizar el stock de un producto en particular
    PUT  /api/products/newStock/?id=[id]&newStock=[newStock]

    -Actualizar el precio de un producto en particular
    PUT  /api/products/newPrice/?id=[id]&newPrice=[newPrice]

    -Disminuir en uno el stock de un prodcuto
    PUT  /api/products/:id

    -Eliminar un producto
    DELETE  /api/products/:id


Usuarios:
    -Listado de usuarios
    GET /api/users/

    -Registracion de usuario
    POST /api/users/register

    -Login de usuario
    POST /api/users/login


Ventas:
    -Listado de ventas
    GET /api/sales/

    -Lista de una venta por Id
    GET /api/sales/:id

    -Lista de una venta por Id de Usuario
    GET /api/sales/user/:id

    -Agregar una venta
    POST /api/sales

EndPoints de Mantenimiento:


Descripción de funcionalidades:


3.	Permitir registrarse en la aplicación (Requisito para realizar un pedido)
4.	Hacer login/logoff en la aplicación
5.	Añadir un producto al carrito
6.	Finalizar la compra

Nice to have:

1.	Búsqueda por producto
a.	(add): Que liste los productos filtrados 
2.	Visualizar histórico de mis pedidos
3.	Anular la compra
a.	(add): se podria agregar un botón de arrepentimiento, el cual se pueda activar 5 min después de haber hecho la compra.
4.	Actualización del estado del pedido
5.	Visualizar el stock del producto
a.	(add): que muestre la cantidad de productos disponibles.
6.	Visualizar la información de la cuenta/perfil
a.	(add): que muestre el email del usuario.



Pantallas:
    .Home
    .Comidas
    .Bebidas
    .Postres
    .Snacks
    .Registracion
    .Login
    .Carrito(checkout)
    .Verificacion de Compra
    .Pago

//////////

Estructura de productos en Mongodb
[
 {
  "_id": ObjectId(id),
  "categoria": "comida/bebida/postre/snack",
  "nombre": "nombre del producto",
  "imgagen": "imagen del producto",
  "precio": "valor del producto",
  "descripcion": "descripcion de los ingrediente",
  "stock": <cantidad>
 }
]


Estructura de usuarios en Mongodb
[
 {
  "_id": ObjectId(id),
  "email": "email del usuario",
  "password": "password encriptada",
 }
]

Estructura de ventas en Mongodb
[
 {
  "_id": ObjectId(id),
  "idUser": user._id,
  "productos": ["<nombre del producto>", "<nombre del producto>"],
	"medioDePago": "efectivo", "tarjeta",
  "numeroTarjeta": "13214654878"
  "fechaVto": "21/12",
  "pin": "1234"
  "montoTotal": 
 }
]

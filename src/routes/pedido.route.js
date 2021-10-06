const express = require('express');
require('../db');
const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');
const mongoose = require('mongoose');
const Producto = require('../models/Producto.model');
const router = express.Router();
const app = express();
app.use(express.json());



/**
 * @swagger
 * /pedidos/crearpedido/{idUser}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 *      
 *      summary: Crear un pedido por parte de un usuario registrado
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:                      
 *                          $ref: '#/components/schemas/pedido' 
 *      responses:
 *          200:
 *              description: Producto agregado
 *          500:
 *              description: No se ha encontrado el producto
 *                  
 *             
 */



// Crear Pedido

router.post('/crearpedido/:idUser', async (req, res) => {
    const { idProducto, cantidad } = req.body;
    const { idUser } = req.params;
    const userEncontrado = await Usuario.findById(idUser)
    //console.log(userEncontrado)
    const productoEncontrado = await Producto.findById(idProducto)
    // console.log(productoEncontrado)
    const nuevoPedido = new Pedido({ email: userEncontrado.email, direccion: userEncontrado.direccion, estado: "Pendiente" })
    productoEncontrado.cantidad = cantidad
    nuevoPedido.productos.push(productoEncontrado)
    nuevoPedido.save();
    res.json(nuevoPedido);
});


/**
 * @swagger
 * /pedidos/confirmarpedido/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Confirmar el pedido por parte de usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/confirmarpedido' 
 *      responses:
 *          200:
 *              description: Se ha confirmado el pedido
 *          401:
 *              descripcion: Usuario no autorizado
 *      
 *
 */







//Confirmar pedido

router.put('/confirmarpedido/:idUser', async (req, res) => {
    const { idPedido } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        pedidoEncontrado.estado = "Confirmado"
        pedidoEncontrado.save();
        res.json(pedidoEncontrado)
    }
    else {
        res.satatus(401).send("Usuario no encontrado")
    }
});

/**
 * @swagger
 * /pedidos/prepararpedido/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Confirmar el pedido por parte de usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/estadopedido' 
 *      responses:
 *          200:
 *              description: Se ha confirmado el pedido
 *          401:
 *              descripcion: Usuario no autorizado
 *      
 *
 */


//Preparar pedido
router.put('/prepararpedido/:idUser', async (req, res) => {
    const { idPedido } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        console.log(pedidoEncontrado)
        if (pedidoEncontrado.estado == "Confirmado") {
            pedidoEncontrado.estado = "En preparacion"
            pedidoEncontrado.save();
            res.json(pedidoEncontrado)
        }
    }

});


/**
 * @swagger
 * /pedidos/encaminopedido/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Pasar a estado enviado del pedido por parte del administrador
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/estadopedido' 
 *      responses:
 *          200:
 *              description: El pedido se ha enviado
 *          401:
 *              description: Usuario no autorizado
 *
 */


//En camino pedido
router.put('/encaminopedido/:idUser', async (req, res) => {
    const { idPedido } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        if (pedidoEncontrado.estado == "En preparacion") {
            pedidoEncontrado.estado = "En camino"
            pedidoEncontrado.save();
            res.json(pedidoEncontrado)
        }
    }
});


/**
 * @swagger
 * /pedidos/entregadopedido/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Pasar a estado en entregado del pedido por parte del administrador
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/estadopedido' 
 *      responses:
 *          200:
 *              description: El pedido se ha entregado
 *          401:
 *              description: Usuario no autorizado
 *
 */

//Pedido entregado
router.put('/entregadopedido/:idUser', async (req, res) => {
    const { idPedido } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        if (pedidoEncontrado.estado == "En camino") {
            pedidoEncontrado.estado = "Pedido Entregado"
            pedidoEncontrado.save();
            res.json(pedidoEncontrado)
        }
    }

});




/**
 * @swagger
 * /pedidos/editarpedidocantidad/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Editar cantidad del pedido de un producto
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cantidadpedido' 
 *      responses:
 *          200:
 *              description: Cantidad del producto cambiada
 *      
 *
 */



//Editar pedido cantidad


router.put('/editarpedidocantidad/:idUser', async (req, res) => {
    const { idPedido, idProducto, nuevaCantidad } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        if (pedidoEncontrado.estado == "En preparacion") {
            const productoEncontrado = await pedidoEncontrado.productos.findById(idProducto)
            if (productoEncontrado) {
                productoEncontrado.cantidad = nuevaCantidad
                productoEncontrado.save();
                res.json(productoEncontrado)
            }
        }
    }

});



/**
 * @swagger
 * /pedidos/eliminarproducto/{idUser}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Eliminar un producto del pedido por parte del usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/eliminarproducto' 
 *      responses:
 *          200:
 *              description: Producto eliminado
 *      
 *
 */

//Eliminar producto del pedido



router.put('/eliminarproducto/:idUser', async (req, res) => {
    const { idPedido, idProducto } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        if (pedidoEncontrado.estado == "En preparacion") {
            const productoEncontrado = pedidoEncontrado.productos.findByIdAndDelete(idProducto)
            res.json(productoEncontrado)
        }
    }
});







/**
 * @swagger
 * /pedidos/agregarproductopedido/{idUser}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Se edita el pedido agregando un nuevo producto por parte del usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/agregarproducto' 
 *      responses:
 *          200:
 *              description: El producto se ha agregado al pedido
 *      
 *
 */

//Agregar producto al pedido

router.post('/agregarproducto/:idUser', async (req, res) => {
    const { idPedido, idProducto } = req.body;
    const { idUser } = req.params;
    const usuarioEncontrado = await Usuario.findById(idUser)
    if (usuarioEncontrado) {
        const pedidoEncontrado = await Pedido.findById(idPedido)
        if (pedidoEncontrado.estado == "En preparacion") {
            const productoEncontrado = Producto.findById(idProducto)
            pedidoEncontrado.productos.push(productoEncontrado)
            res.json(pedidoEncontrado)
        }
    }
});

/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: Obtener todos los Pedidos del sistema por parte del administrador
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Historial de todos los pedidos del sistema
 *              
 */

//Historial de pedidos por parte del administrador
router.get('/', async (req, res) => {
    const historialPedidos = await Pedido.find()
    res.json(historialPedidos)

})





/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      pedido:         
 *          type: object
 *          required:
 *              -cantidad
 *              -idProducto
 *          properties:
 *              cantidad:
 *                  type: integer
 *                  description: Numero de productos que desea llevar
 *              idProducto:
 *                  type: integer
 *                  description: Identificador del producto
 *          example:
 *              cantidad: 5
 *              idProducto: 612db83b6b0c789f544cba58
 */




/**
 * @swagger
 * tags:
 *  name: confirmarpedido
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      confirmarpedido:
 *          type: object
 *          required:          
 *              -idPedido
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Identificador del pedido
 *          example:
 *              idPedido: 612d9fb9819771a0f0426815
 */


/**
 * 
 * @swagger
 * tags:
 *  name: estadopedido
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      estadopedido:
 *          type: object
 *          required:          
 *              -idPedido
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Identificador del pedido
 *          example:
 *              idPedido: 612d9fb9819771a0f0426815
 *           
 *             
 */


/**
 * @swagger
 * tags:
 *  name: EditarCantidadPedidos
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      cantidadpedido:
 *          type: object
 *          required:          
 *              -idPedido
 *              -idProducto
 *              -nuevaCantidad
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Numero del pedido
 *              cantidad:
 *                  type: integer
 *                  description: Numero de productos que desea llevar
 *              nuevaCantidad:
 *                  type: integer
 *                  description: Modificar la cantidad el producto
 *          example:
 *              idPedido: 1
 *              idProducto: 1
 *              nuevaCantidad: 3621
 */


/**
 * @swagger
 * tags:
 *  name: EliminarProducto
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      eliminarproducto:
 *          type: object
 *          required:          
 *              -idPedido
 *              -idProducto
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Numero del pedido
 *              idProducto:
 *                  type: integer
 *                  description: Identificador del producto
 *          example:
 *              idPedido: 1
 *              idProducto: 2
 *             
 */

/**
 * @swagger
 * tags:
 *  name: AgregarProducto
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      agregarproducto:
 *          type: object
 *          required:          
 *              -idPedido
 *              -idProducto
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Numero del pedido
 *              idProducto:
 *                  type: integer
 *                  description: Identificador del producto
 *          example:
 *              idPedido: 1
 *              idProducto: 2
 *             
 */




module.exports = router;

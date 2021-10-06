const express = require('express');
require('../db');
const Producto = require('../models/Producto.model');
const mongoose = require('mongoose');
const cacheProductos = require('../middlewares/Productoscache.middleware')
//const ProductoModel = require('../models/Producto.model');
const clienteRedis = require('../redis')
const router = express.Router();




/**
 * @swagger
 * /productos/agregarproducto:
 *  post:
 *           
 *      summary: Agregar un producto por parte del administrador
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:   
 *                  
 *                          $ref: '#/components/schemas/agregarproducto' 
 * 
 *      responses:
 *          200:
 *              description: El producto se ha agregado correctamente
 *                 
 *             
 */

//Agregar producto
router.post('/agregarproducto', async (req, res) => {
    const { nombre, precio, descripcion } = await req.body;
    const nuevoProducto = new Producto({ nombre, precio, descripcion });
    
    nuevoProducto.save();
    res.json(nuevoProducto)
    // res.status(200).send()
})




/**
 * @swagger
 * /productos/editarproducto/{idProducto}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idProducto
 *        description: Identificador del producto
 *        required: true
 *        type: integer
 *      
 *      summary: Editar un producto por parte del administrador
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/editarproducto' 
 *      responses:
 *          200:
 *              description: Producto actualizado correctamente
 *         
 *                  
 *             
 */

//Editar producto

router.put('/editarproducto/:idProducto', async (req, res) => {
    const { idProducto } = await req.params;
    const { nombre, precio } = await req.body;
    const productoEditado = await Producto.findById(idProducto)
    console.log(productoEditado)
    productoEditado.nombre = nombre;
    productoEditado.precio = precio;
    productoEditado.save();
    res.json(productoEditado)
    // res.status(200).send()
})

/**
 * @swagger
 * /productos/elimnarproducto/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: Identificador del producto
 *        required: true
 *        type: integer
 *      summary: Eliminar un producto por parte del administrador
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: El producto se ha eliminado correctamente
 * 
 */

//Eliminar producto

router.delete('/eliminarproducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(idProducto)
    res.json(productoEliminado)
})


/**
 * @swagger
 * /productos:
 *  get:
 *           
 *      summary: Obtener todos los productos por parte del administrador
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *               
 *      responses:
 *          200:
 *              description: Estos son los productos
 *                 
 *             
 */



//Leer los productos

router.get('/', cacheProductos,async (req, res) => {
    const productos = await Producto.find()
    clienteRedis.setex('productos', 5*60, JSON.stringify(productos))
    res.json(productos)
   
})

/**
 * @swagger
 * tags:
 *  name: Producto
 *  description: Agregar producto
 * 
 * components: 
 *  schemas:
 *      agregarproducto:
 *          type: object
 *          required:       
 *              -nombre
 *              -precio
 *              -descripcion
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Describa el producto
 *              precio:              
 *                  type: integer
 *                  description: Precio del producto
 *              descripcion:
 *                  type: string
 *                  description: Breve descripcion del producto
 *          example:
 *              nombre: jabon
 *              precio: 2500
 *              descripcion: Jabonsuave
 *              
 *           
 *             
 */



/**
 * @swagger
 * tags:
 *  name: Producto
 *  description: Editar producto
 * 
 * components: 
 *  schemas:
 *      editarproducto:
 *          type: object
 *          required:       
 *              -nombre
 *              -precio
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Actualice el nombre del producto
 *              precio:              
 *                  type: integer
 *                  description: Actualice el precio del producto
 *              
 *          example:
 *              nombre: jabon azul
 *              precio: 3000
 *              
 *              
 *           
 *             
 */


module.exports = router;


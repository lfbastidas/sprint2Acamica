const express = require('express');
require('../db');
const Pago = require('../models/MediosPago.model');
const mongoose = require('mongoose');

const router = express.Router();
const app = express();
app.use(express.json());


/**
 * @swagger
 * /mediodepago/agregarmedioPago:
 *  post:
 *           
 *      summary: Agregar un medio de pago por parte del administrador
 *      tags: [Medios de pago]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:   
 *                  
 *                          $ref: '#/components/schemas/agregarmediodepago' 
 * 
 *      responses:
 *          200:
 *              description: El Medio de pago se ha agregado correctamente
 *                 
 *             
 */

//Agregar producto
router.post('/agregarmediopago', async (req, res) => {
    const { nombreMedioPago } = await req.body;
    const nuevoMedioPago = new Producto({ nombreMedioPago });
    nuevoMedioPago.save();
    res.json(nuevoMedioPago)
    // res.status(200).send()
})




/**
 * @swagger
 * /mediodepago/editarmediopago/{idMedioPago}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idMedioPago
 *        description: Identificador del medio de pago
 *        required: true
 *        type: integer
 *      
 *      summary: Editar un medio de pago por parte del administrador
 *      tags: [Medios de pago]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/editarmediodepago' 
 *      responses:
 *          200:
 *              description: Medio de pago actualizado correctamente
 *         
 *                  
 *             
 */

//Editar medio de Pago

router.put('/editarmediopago/:idMedioPago', async (req, res) => {
    const { idMedioPago } = await req.params;
    const { nombreMedioPago } = await req.body;
    const medioPagoEditado = await Producto.findById(idMedioPago)
    console.log(medioPagoEditado)
    nombreMedioPago.nombreMedioPago = nombreMedioPago;
    medioPagoEditado.save();
    res.json(medioPagoEditado)
    // res.status(200).send()
})

/**
 * @swagger
 * /mediodepago/elimnarmediopago/{idMedioPago}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: idMedioPago
 *        description: Identificador del medio de pago
 *        required: true
 *        type: integer
 *      summary: Eliminar un medio de pago por parte del administrador
 *      tags: [Medios de pago]
 *      responses:
 *          200:
 *              description: El medio de pago se ha eliminado correctamente
 * 
 */

//Eliminar producto

router.delete('/eliminarmediopago/:idMedioPago', async (req, res) => {
    const { idMedioPago } = req.params;
    const medioPagoEliminado = await Producto.findByIdAndDelete(idMedioPago)
    res.json(medioPagoEliminado)
})


/**
 * @swagger
 * /mediodepago:
 *  get:
 *           
 *      summary: Obtener todos los medios de pago por parte del administrador
 *      tags: [Medios de pago]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *               
 *      responses:
 *          200:
 *              description: Estos son los medios de pago
 *                 
 *             
 */



//Leer los productos

router.get('/', async (req, res) => {
    const totalMediosdePago = await Pago.find()
    res.json(totalMediosdePago)
    // res.status(200).send()
})

/**
 * @swagger
 * tags:
 *  name: Medios de pago
 *  description: Agregar medio de pago
 * 
 * components: 
 *  schemas:
 *      agregarmediodepago:
 *          type: object
 *          required:       
 *              -nombreMedioPago
 *              
 *          properties:
 *              nombreMedioPago:
 *                  type: string
 *                  description: Escriba el nombre del medio de pago
 *              
 *          example:
 *              nombreMedioPago: Tarjeta de credito
 *              
 *              
 *           
 *             
 */



/**
 * @swagger
 * tags:
 *  name: Medios de pago
 *  description: Editar medio de pago
 * 
 * components: 
 *  schemas:
 *      editarmediodepago:
 *          type: object
 *          required:       
 *              -nombreMedioPago
 *              
 *          properties:
 *              nombreMedioPago:
 *                  type: string
 *                  description: Actualice el nombre del medio de pago
 *                           
 *          example:
 *              nombreMedioPago: Tarjeta debito
 *            
 *              
 *              
 *           
 *             
 */







module.exports = router;
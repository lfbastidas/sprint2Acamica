const express = require('express');
require('../db');
const Usuario = require('../models/Usuario.model');
const usuarioValidation = require('../schemas/usuarioSchema')
const loginSchema = require('../schemas/loginSchema')
const jsonwebtoken = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
app.use(express.json());

const misuperpass = 'clavefelipe'

app.use(
    expressJwt({
        secret: misuperpass,
        algorithms: ['HS256']
    }).unless({
        path: ['/login', '/registrar']
    })
)

/**
 * @swagger
 * /usuario/login:
 *  post:
 *      summary: Loguear usuario
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login' 
 *      responses:
 *          200:
 *              description: Usuario logueado correctamente
 *          400:
 *              description: La contraseña no es correcta
 *
 */


router.post('/login', async (req, res) => {
    try {
        const {
            email,
            contrasena,
        } = await loginSchema.validateAsync(req.body);

        const {
            contrasena: contrasenaUsuario,
            esAdministrador,
        } = await Usuario.findOne({ email });
        // console.log({ email })
        const resultado = bcrypt.compareSync(contrasena, contrasenaUsuario);
        if (resultado) {
            const token = jsonwebtoken.sign({
                email,
                esAdministrador,
            }, misuperpass);
            res.json({ token });
        } else {
            res.status(401).json('Unauthorized');
        }
    } catch (error) {
        res.status(404).json(error);
    }
});




/**
 * @swagger
 * /usuario/registrar:
 *  post:
 *      summary: Registrar usuario
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/registro' 
 *      responses:
 *          200:
 *              description: Usuario registrado correctamente
 *          400:
 *              description: No se ha podido registrar correctamente
 *
 */





router.post('/registrar', async (req, res) => {
    const { email } = req.body
    const emailrepetido = await Usuario.findOne({ email })
    if (emailrepetido) {
        res.send("Este usuario ya esta registrado")
    }
    else {
        try {
            const {
                nombreusuario,
                nombrescompletos,
                email,
                telefono,
                direccion,
                contrasena,

            } = await usuarioValidation.validateAsync(req.body);



            const usuario = new Usuario({
                nombreusuario,
                nombrescompletos,
                email,
                telefono,
                direccion,
                contrasena: bcrypt.hashSync(contrasena, 10),

            });
            const usuarioCreado = await usuario.save();
            res.json(usuarioCreado);
        } catch (error) {
            res.status(404).json(error);
        }
    }
});






/*router.post('/', async (req, res) => {
    const { usuario, nombrescompletos, email, telefono, direccion, contrasena } = await req.body;
    const nuevoRegistro = new Registro({ usuario, nombrescompletos, email, telefono, direccion, contrasena });
    nuevoRegistro.save();
    res.json(nuevoRegistro)
    // res.status(200).send()
})*/








/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del usuario
 *          example:    
 *              email: cristiano@gmail.com
 *              contrasena: '123456'
 *          security:
 *	         - bearerAuth: []         
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      registro:
 *          type: object
 *          required:
 *              -nombreusuario
 *              -nombrescompletos
 *              -email
 *              -telefono
 *              -direccion
 *              -contrasena
 *              
 *          properties:
 *              nombreusuario:
 *                  type: string
 *                  description: Nombre de usuario
 *              nombrescompletos:
 *                  type: string
 *                  description: Nombres completos
 *              
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              telefono:
 *                  type: Number
 *                  description: Numero de contacto
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del usuario
 *          example:
 *              nombreusuario: cristiano
 *              nombrescompletos: cristianoronaldo    
 *              email: cristiano@gmail.com
 *              telefono: 3158427184
 *              direccion: cra 175
 *              contrasena: '123456'
 *                 
 * 
 */

module.exports = router;

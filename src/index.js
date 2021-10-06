const express = require('express');
//const basicAuth = require('express-basic-auth');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const expressJwt = require('express-jwt')




/*const usuarioRoutes = require('./routes/usuario.route');  // llamo el archivo donde tengo la ruta usuario, donde tengo los endpoints
const productoRoutes = require('./routes/producto.route')// llamo el archivo donde tengo la ruta producto, donde tengo los endpoints

const registroRoutes = require('./routes/registro.route');

const loginRoutes = require('./routes/login.route');

//Estoy llamando a mis usuarios para luego verificar la autenticacion


const autenticacion = require('./middlewares/Autenticacion.middleware');

//const { adminpermisos } = require('./middlewares/Administrador.middleware');*/
const productoRoutes = require('./routes/producto.route')
const registroRoutes = require('./routes/usuario.route')
const pedidoRoutes = require('./routes/pedido.route');
const mediopagoRoutes = require('./routes/pago.route');
// llamo el archivo donde tengo la ruta pedido, donde tengo los endpoints
const swaggerOptions = require('./utils/swaggerOptions');
const helmet = require("helmet");
const app = express();
app.use(express.json());


//Autenticación con basic auth

//Swagger

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
/*
app.use('/login', loginRoutes);
app.use('/registro', registroRoutes);
*/
app.use('/usuario', registroRoutes);
app.use('/productos', productoRoutes); 

const misuperpass = 'clavefelipe'
app.use(
    expressJwt({
        secret: misuperpass,
        algorithms: ['HS256']
    })
)


app.use(helmet());
app.use('/mediopago', mediopagoRoutes);
app.use('/pedidos', pedidoRoutes);

//cuando llame a /usuarios vaya a productoRoutes  que lo traje en el require
//cuando llame a /usuarios vaya a pedidoRoutes  que lo traje en el require*/
/*app.use('/usuarios', usuarioRoutes);
 //cuando llame a /usuarios vaya a usuarioRoutes  que lo traje en el require



*/



app.listen(3000, () => { console.log('Escuchando en el puerto 3000') });
module.exports = app;
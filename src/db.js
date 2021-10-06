const mongoose = require('mongoose');
const datos = require('./dataenfrio/datos')
const Usuario = require('./models/Usuario.model')
const Producto = require('./models/Producto.model')
const productos = require('./dataenfrio/productos')
const db = (async () => {
    const db = await mongoose.connect('mongodb://localhost:27017/restaurante', { useNewUrlParser: true, useUnifiedTopology: true });  
    const revBD = await Usuario.find()
    const revProduBD = await Producto.find()

    console.log(revBD)
    if(revBD.length==0){
        datos.crearUser()
        }
    if(revProduBD.length==0) {
        productos.crearProductos()
    }
    
   
    console.log('Conectado a la BD');
}
)();




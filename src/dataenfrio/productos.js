const Producto = require('../models/Producto.model')


const crearProductos = async ()=> {   
        const producto = await new Producto( {id: 1, nombre: 'Cocacola', precio: '3000', descripcion:'gaseosa fria'})
        producto.save()
        
        return producto
   


}
module.exports = {crearProductos};

const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    precio: {
        required: true,
        type: Number,
    },
    cantidad: {
        type: Number,
        default: 1,
    },
    descripcion: {
        required: true,
        type: String
    }
})


module.exports = mongoose.model('Producto', productoSchema);





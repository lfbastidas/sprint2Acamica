const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    direccion: String,
    estado: String,
    productos: [{

    }]
});

module.exports = mongoose.model('Pedido', pedidoSchema);
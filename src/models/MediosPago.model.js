const mongoose = require('mongoose');

const medioPagoSchema = new mongoose.Schema({
    formaPago: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pago', medioPagoSchema);
const { boolean } = require('joi');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombreusuario: {
        required: true,
        type: String
    },
    nombrescompletos: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String
    },
    telefono: {
        required: true,
        type: Number,
    },
    direccion: {
        required: true,
        type: String
    },
    contrasena: {
        required: true,
        type: String
    },
    esADministrador: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('Usuario', usuarioSchema);

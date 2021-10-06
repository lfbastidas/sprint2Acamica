const joi = require('joi');

const usuarioValidation = joi.object({
    nombreusuario: joi
        .string()
        .min(3)
        .max(30)
        .required(),
    nombrescompletos: joi
        .string()
        .min(3)
        .max(30)
        .required(),
    telefono: joi
        .number()


        .required()
    ,
    email: joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'co'] },
        }),
    direccion: joi
        .string()
        .min(3)
        .max(30)
        .required()
    ,
    contrasena: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repetir_contrasena: joi.ref('contrasena'),
    esAdministrador: joi.boolean(),
});

module.exports = usuarioValidation;


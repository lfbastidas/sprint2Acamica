const Usuario = require('../models/Usuario.model')


const crearUser = async ()=> {   
        const usuario = await new Usuario( {nombreusuario :"Messi", nombrescompletos:"Leonel Messi", email:"felipe1@gmail.com", telefono:"456785488",direccion:"Sincelejo",contrasena:"Goku2704"})
        usuario.save()
        
        return usuario
   


}
module.exports = {crearUser};



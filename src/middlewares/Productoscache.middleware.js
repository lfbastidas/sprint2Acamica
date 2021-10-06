const clienteRedis = require('../redis')



const cacheProductos = async (req, res, next) => {
  
    clienteRedis.get('productos', (err, data) => {
        if(err) throw err;

        if(data){
            res.json(JSON.parse(data));
        } else {
            next();
        }
    });
}

module.exports = cacheProductos;
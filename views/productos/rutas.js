import Express from 'express';
import { queryAllProducts, crearProducto, editarProducto, elimiarProducto, consultarProducto } from '../../controllers/productos/controller.js';

const rutasProductos = Express.Router();

const genericCallback = (res)=>(err, result)=>{
        if (err) {
                console.log('error', err);
                res.status(500).json({error: err})
            } else {
                res.json(result);
            }
        };

rutasProductos.route('/productos').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /productos");
    queryAllProducts(genericCallback(res));
   
});

rutasProductos.route('/productos').post((req, res)=>{
    crearProducto(req.body, genericCallback(res));
});

rutasProductos.route('/productos/:id').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /productos");
    consultarProducto(req.params.id, genericCallback(res));
   
});

rutasProductos.route('/productos/:id').patch((req, res)=>{
    editarProducto(req.params.id, req.body, genericCallback(res));
});

rutasProductos.route('/productos/:id').delete((req, res)=>{
    elimiarProducto(req.params.id, genericCallback(res))
});

export default rutasProductos;

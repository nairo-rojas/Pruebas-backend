import Express from 'express';
import { queryAllProducts, crearProducto, editarProducto, elimiarProducto } from '../../controllers/productos/controller.js';

const rutasProductos = Express.Router();

const genericCallback = (res)=>(err, result)=>{
        if (err) {
                res.status(500).send("error consultando los productos")
            } else {
                res.json(result);
            }
        };

rutasProductos.route('/productos').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /productos");
    queryAllProducts(genericCallback(res));
   
});

rutasProductos.route('/productos/nuevo').post((req, res)=>{
    crearProducto(req.body, genericCallback(res));
});

rutasProductos.route('/productos/editar').patch((req, res)=>{
    editarProducto(req.body, genericCallback(res));
});

rutasProductos.route('/productos/eliminar').delete((req, res)=>{
    elimiarProducto(req.body.id, genericCallback(res))
});

export default rutasProductos;
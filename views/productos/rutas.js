import Express from 'express';
import { queryAllProducts, crearProducto, editarProducto, eliminarProducto } from '../../controllers/productos/controller.js';



const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
        if (err) {
            res.status(500).send("Error consultando el producto");
        } else {
            res.json(result);
        }
    };


rutasProducto.route('/productos').get((req, res) => {
    console.log("Alguien hizo GET en la ruta /vehiculos");
    queryAllProducts(genericCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
    crearProducto(req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
   editarProducto(req.params.id, req.body, genericCallback(res));

})

rutasProducto.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, genericCallback(res));
})

export default rutasProducto;
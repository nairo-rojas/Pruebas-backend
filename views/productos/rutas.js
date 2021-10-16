import Express from 'express';
import { getAllProducts, crearProducto, editarProducto, eliminarProducto,  } from '../../controllers/productos/controller.js';



const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
        if (err) {
            console.log("error", err);
            res.status(500).json({ error:err });
        } else {
            res.json(result);
        }
    };


rutasProducto.route('/productos').get((req, res) => {
    console.log("Alguien hizo GET a todos los productos");
    getAllProducts( genericCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
    console.log("Alguien creó un producto")
    crearProducto(req.body, genericCallback(res));
});

// rutasProducto.route('/productos').get((req, res) => {
//     console.log("Alguien hizo GET a un producto");
//     consultarProducto(req.params.id, genericCallback(res));
// });

rutasProducto.route('/productos/:id').patch((req, res) => {
    console.log("Alguien editó un producto")
    editarProducto(req.params.id, req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    console.log("Alguien eliminó un producto")
    eliminarProducto(req.params.id, genericCallback(res));
});

export default rutasProducto;
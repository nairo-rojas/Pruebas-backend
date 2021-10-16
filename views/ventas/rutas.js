import Express from 'express';
import { getAllSales, crearVenta, editarVenta, eliminarVenta,  } from '../../controllers/ventas/controller.js';



const rutasVenta = Express.Router();

const genericCallback = (res) => (err, result) => {
        if (err) {
            res.status(500).send("Error consultando el venta");
        } else {
            res.json(result);
        }
    };


rutasVenta.route('/ventas').get((req, res) => {
    console.log("Alguien hizo GET a todos los ventas");
    getAllSales( genericCallback(res));
});

rutasVenta.route('/ventas').post((req, res) => {
    crearVenta(req.body, genericCallback(res));
});

// rutasVenta.route('/ventas').get((req, res) => {
//     console.log("Alguien hizo GET a un venta");
//     consultarVenta(req.params.id, genericCallback(res));
// });


rutasVenta.route('/ventas/:id').patch((req, res) => {
   editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res) => {
    eliminarVenta(req.params.id, genericCallback(res));
});

export default rutasVenta;
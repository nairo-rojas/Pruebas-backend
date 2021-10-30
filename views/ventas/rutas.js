import Express from 'express';
import { queryAllSales, crearVenta, editarVenta, elimiarVenta, consultarVenta } from '../../controllers/ventas/controller.js';

const rutasVentas = Express.Router();

const genericCallback = (res)=>(err, result)=>{
        if (err) {
                res.status(500).send("error consultando los ventas")
            } else {
                res.json(result);
            }
        };

rutasVentas.route('/ventas').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /ventas");
    queryAllSales(genericCallback(res));
   
});

rutasVentas.route('/ventas').post((req, res)=>{
    crearVenta(req.body, genericCallback(res));
});

rutasVentas.route('/ventas/:id').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /ventas");
    consultarVenta(req.params.id, genericCallback(res));
   
});

rutasVentas.route('/ventas/:id').patch((req, res)=>{
    editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasVentas.route('/ventas/:id').delete((req, res)=>{
    elimiarVenta(req.params.id, genericCallback(res))
});

export default rutasVentas;

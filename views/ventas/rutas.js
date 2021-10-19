import Express from 'express';
import { crearVenta, eliminarVenta, editarVenta, getAllSales,} from '../../controllers/ventas/controller.js';

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasUsuario.route('/ventas').get((req, res) => {
    getAllSales(genericCallback(res));
});

rutasUsuario.route('/ventas').post((req, res) => {
  crearVenta(req.body, genericCallback(res));
  
});

rutasUsuario.route('/ventas/:id').patch((req, res) => {
  editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route('/ventas/:id').delete((req, res) => {
  eliminarVenta(req.params.id, genericCallback(res));
});

export default rutasUsuario;

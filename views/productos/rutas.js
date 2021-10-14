import Express from 'express';
import { queryAllProducts, crearProducto } from '../../controllers/productos/controller.js';



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

rutasProducto.route('/productos/nuevo').post((req, res) => {
    crearProducto(req.body, genericCallback(res));
});

rutasProducto.route('/productos/editar').patch((req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroVehiculo = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    baseDeDatos
        .collection('producto')
        .findOneAndUpdate(filtroVehiculo, operacion),
        { upsert: true, returnOriginal: true },
        (err, result) => {
            if (err) {
                console.error('error actualizando el producto:', err);
                res.sendStatus(500);
            } else {
                console.log('actualizado con éxito');
                res.sendStatus(200);
            }
        }


})

rutasProducto.route('/productos/eliminar').delete((req, res) => {
    const eliminar = req.body;
    const filtroVehiculo = { _id: new ObjectId(eliminar.id) };
    const baseDeDatos = getDB();
    baseDeDatos.collection('producto').deleteOne(filtroVehiculo, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            console.log(result);
            res.sendStatus(200);


        }
    })
})

export default rutasProducto;
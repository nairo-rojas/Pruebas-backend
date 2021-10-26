import Express from 'express';
import { queryAllProducts, crearProducto } from '../../controllers/productos/controller.js';
import { getDB } from "../../db/db.js";

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
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    baseDeDatos
        .collection('producto')
        .findOneAndUpdate(
            filtroProducto,
            operacion,
            {upsert:true, returnOriginal:true},
            (err, result)=>{
                if (err) {
                    console.error("error actualizando el producto", err);
                    res.sendStatus(500);
                } else {
            console.log("producto actualizado con éxito")
            res.sendStatus(200);
        }
    })
});

rutasProductos.route('/productos/eliminar').delete((req, res)=>{
const filtroProducto = {_id: new ObjectId(req.body.id)};
const baseDeDatos = getDB();
baseDeDatos.collection('producto').deleteOne(filtroProducto, (err, result)=>{
    if (err) {
        console.error(err);
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
});
});

export default rutasProductos;
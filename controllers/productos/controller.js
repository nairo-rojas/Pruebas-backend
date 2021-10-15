import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';


const queryAllProducts = async (callback) => {
    const baseDeDatos = getDB();

    await baseDeDatos
        .collection('producto')
        .find()
        .limit(50).toArray(callback);
};

const crearProducto = async ( datoProducto, callback)=>{
    if (
        Object.keys(datoProducto).includes('name') &&
        Object.keys(datoProducto).includes('type') &&
        Object.keys(datoProducto).includes('amount')) {
        const baseDeDatos = getDB();
        //implementar codigo par conectarse a la db
        await baseDeDatos.collection('producto').insertOne(datoProducto, callback)
            } else {
                return 'error';
    }
};

const editarProducto = async(id, edicion, callback)=>{
    const filtroVehiculo = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('producto')
        .findOneAndUpdate(filtroVehiculo, operacion,
        { upsert: true, returnOriginal: true }, callback);

}

const eliminarProducto = async (id, callback)=>{
   const filtroVehiculo = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroVehiculo, callback);
}
export { queryAllProducts, crearProducto, editarProducto, eliminarProducto };
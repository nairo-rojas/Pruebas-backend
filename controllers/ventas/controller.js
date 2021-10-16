
import { ObjectId} from 'mongodb';
import { getDB } from '../../db/db.js';


const getAllSales = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').find({}).limit(50).toArray(callback);
};

const crearVenta = async ( datoVenta, callback)=>{
    if (
        Object.keys(datoVenta).includes('name') &&
        Object.keys(datoVenta).includes('lastname') &&
        Object.keys(datoVenta).includes('email')) {
        const baseDeDatos = getDB();
        //implementar codigo par conectarse a la db
        await baseDeDatos.collection('venta').insertOne(datoVenta, callback)
            } else {
                return 'error';
    }
};

// const consultarVenta = async(id, callback)=>{
//     const baseDeDatos = getDB();
//     await baseDeDatos.collection('venta').findOne({ _id: new ObjectId(id) }, callback);
// }

const editarVenta = async(id, edicion, callback)=>{
    const filtroVenta = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .findOneAndUpdate(filtroVenta, operacion,
        { upsert: true, returnOriginal: true }, callback);

}

const eliminarVenta = async (id, callback)=>{
   const filtroVenta = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').deleteOne(filtroVenta, callback);
}
export { getAllSales, crearVenta, editarVenta, eliminarVenta };
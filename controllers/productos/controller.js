
import { ObjectId} from 'mongodb';
import { getDB } from '../../db/db.js';


const getAllProducts = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').find({}).limit(50).toArray(callback);
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

// const consultarProducto = async(id, callback)=>{
//     const baseDeDatos = getDB();
//     await baseDeDatos.collection('producto').findOne({ _id: new ObjectId(id) }, callback);
// }

const editarProducto = async(id, edicion, callback)=>{
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('producto')
        .findOneAndUpdate(filtroUsuario, operacion,
        { upsert: true, returnOriginal: true }, callback);

}

const eliminarProducto = async (id, callback)=>{
   const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroUsuario, callback);
}
export { getAllProducts, crearProducto, editarProducto, eliminarProducto };
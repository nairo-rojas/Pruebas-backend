
import { ObjectId} from 'mongodb';
import { getDB } from '../../db/db.js';


const getAllUser = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async ( datoUsuario, callback)=>{
    if (
        Object.keys(datoUsuario).includes('name') &&
        Object.keys(datoUsuario).includes('lastname') &&
        Object.keys(datoUsuario).includes('email')) {
        const baseDeDatos = getDB();
        //implementar codigo par conectarse a la db
        await baseDeDatos.collection('usuario').insertOne(datoUsuario, callback)
            } else {
                return 'error';
    }
};

// const consultarUsuario = async(id, callback)=>{
//     const baseDeDatos = getDB();
//     await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
// }

const editarUsuario = async(id, edicion, callback)=>{
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuario')
        .findOneAndUpdate(filtroUsuario, operacion,
        { upsert: true, returnOriginal: true }, callback);

}

const eliminarUsuario = async (id, callback)=>{
   const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
}
export { getAllUser, crearUsuario, editarUsuario, eliminarUsuario };
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllProducts = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto')
        .find({})
        .limit(50)
        .toArray(callback);
};

const crearProducto = async (datosProducto, callback) => {
    if (
        Object.keys(datosProducto).includes('name') &&
        Object.keys(datosProducto).includes('package') &&
        Object.keys(datosProducto).includes('presentation') &&
        Object.keys(datosProducto).includes('price')) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('producto').insertOne(datosProducto, callback);
    } else {
        return "error";
    }
};

const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('producto')
        .findOneAndUpdate(
            filtroProducto,
            operacion,
            { upsert: true, returnOriginal: true },callback)
};

const elimiarProducto = async(id, callback)=>{
    const filtroProducto = {_id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
};

export { queryAllProducts, crearProducto, editarProducto, elimiarProducto };
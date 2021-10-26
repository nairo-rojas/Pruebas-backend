import { getDB } from "../../db/db.js";

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


export { queryAllProducts, crearProducto };
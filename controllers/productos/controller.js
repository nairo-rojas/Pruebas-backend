import { getDB } from '../../db/db.js';


const queryAllProducts = async (callback) => {
    const baseDeDatos = getDB();

    await baseDeDatos
        .collection('producto')
        .find()
        .limit(50).toArray(callback);
};

const crearProducto = ( datoProducto, callback)=>{
    if (
        Object.keys(datoProducto).includes('name') &&
        Object.keys(datoProducto).includes('type') &&
        Object.keys(datoProducto).includes('amount')) {
        const baseDeDatos = getDB();
        //implementar codigo par conectarse a la db
        baseDeDatos.collection('producto').insertOne(datoProducto, callback)
            } else {
                return 'error';
    }
};

export { queryAllProducts, crearProducto };
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwtDecode from "jwt-decode";

const queryAllUsers = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario')
        .find({})
        .limit(50)
        .toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario')
        .findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (req, callback) => {
    //6.1 obtener datos del uduario desde el token
    const token = req.headers.authorization.split('Bearer')[1];
    const user = jwtDecode(token)['http://localhost/userData'];
    console.log(user)
    //6.2 con el correo del ususario o con el id de Auth0 verificar su el usuario existe o no
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({ email: user.email }, async (err, response) => {
        //6.3. si el usuario no existe en la db lo crea y devuelve la inf
        if (response) {
            // 7.1 si el usuario existe en la db devuelve la info
            callback(err, response);
        } else {
            //7.2 Si el usuario no existe en la db lo crea y devuelve la info
            user.auth0ID = user._id;
            delete user._id;
            user.rol = 'sin roll';
            user.estado = 'pendiente';
            await crearUsuario(user, (err, response) => callback(err, user));
        }
    })
};

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuario')
        .findOneAndUpdate(
            filtroUsuario,
            operacion,
            { upsert: true, returnOriginal: true }, callback)
};

const elimiarUsuario = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

export { queryAllUsers, crearUsuario, consultarOCrearUsuario, consultarUsuario, editarUsuario, elimiarUsuario };

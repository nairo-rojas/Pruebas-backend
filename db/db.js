import { MongoClient} from "mongodb";
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});

//Crear un string de conexion
const stringConexion = process.env.DATABASE_URL;

//Crear una clase para Mongoclient para conexion
const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let baseDeDatos;

const conectarDB = (callback)=>{
    client.connect((err, db) => {
        if (err) {
            console.error("Error conectando a la base de datos");
        }
        baseDeDatos = db.db('Productos');
        console.log("Conexion a la DB exitosa");
        return callback();
    });
};

const getDB = ()=>{
    return baseDeDatos;
}

export {conectarDB, getDB};

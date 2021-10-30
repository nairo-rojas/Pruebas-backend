import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config({path: './.env'}); 

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const getDB = ()=>{
    return baseDeDatos;
}
let baseDeDatos;

const conectarDB =(callback)=>{
    client.connect((err, db)=>{
        if (err) {
            console.error("error conectando a la base de datos")
        } 
        baseDeDatos = db.db('Gestion-ventas');
        console.log("Conexión existosa a la baseDeDatos")
        return callback();
    });
};

export {conectarDB, getDB};

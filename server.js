import Express from "express";
import { ObjectId } from "mongodb";
import { conectarDB } from "./db/db.js";
import dotenv from 'dotenv';
import Cors from 'cors';
import rutasProductos from "./views/productos/rutas.js";


dotenv.config({path: './.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);


const main = ()=>{
    return app.listen(process.env.PORT, ()=>{
        console.log(`Escuchando en el puerto ${process.env.PORT}`);
    });
};

conectarDB(main);

//forma antigua o tradicional de hacer improt
//const require = require('express');
//En package.js agregar "type": "modules" para hacer impor normales
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB} from './db/db.js';
import rutasProducto from "./views/productos/rutas.js";

dotenv.config({path:'./.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando en el puerto ${process.env.PORT}`);
    });
};

conectarDB(main);



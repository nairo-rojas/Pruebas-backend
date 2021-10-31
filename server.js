import Express from "express";
import { conectarDB } from "./db/db.js";
import dotenv from 'dotenv';
import Cors from 'cors';
import rutasProductos from "./views/productos/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";
import autorizacionEstadoUsuario from "./middleware/autorizacionEstadoUsuario.js";


dotenv.config({path: './.env'});
const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.use(autorizacionEstadoUsuario);
app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas);


const main = ()=>{
    return app.listen(port, ()=>{
        console.log(`Escuchando en el puerto ${port}`);
    });
};

conectarDB(main);

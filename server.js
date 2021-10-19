//forma antigua o tradicional de hacer improt
//const require = require('express');
//En package.js agregar "type": "modules" para hacer impor normales
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { connectServer} from './db/db.js';
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import rutasProducto from "./views/productos/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";


dotenv.config({path:'./.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://gestion-ventas-ants.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-gestion-ventas',
  issuer: 'https://gestion-ventas-ants.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(rutasProducto);
app.use(rutasUsuario)
app.use(rutasVentas)

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando en el puerto ${process.env.PORT}`);
    });
};

connectServer(main);



import { getDB } from "../db/db.js";
import jwtDecode from "jwt-decode";

const autorizacionEstadoUsuario = async (req, res, next) => {
    //1. Obtener usuario del token
    const token = req.headers.authorization.split('Bearer')[1];
    const user = jwtDecode(token)['http://localhost/userData'];
    console.log(user);
    //2. Consultar el usuario en la DB
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({ email: user.email }, async (err, response) => {
        if (response) {
            console.log(response);
            //3. Verificar el estado del usuario
            if (response.estado === 'rechazado') {
                //4. si el usuario esta rechazo, devolver error de autenticació
                res.sendStatus(401);
                res.end();
            } else {
                console.log('habilitado')
                //5. Si el usuario esta pendiente o habilitado, ejecutar netx()
                next();
            }
        } else {
            next();
        }
    });
};

export default autorizacionEstadoUsuario;
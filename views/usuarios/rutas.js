import Express from 'express';
import { queryAllUsers, crearUsuario, editarUsuario, elimiarUsuario, consultarUsuario, consultarOCrearUsuario } from '../../controllers/usuarios/controller.js';

const rutasUsuarios = Express.Router();

const genericCallback = (res)=>(err, result)=>{
        if (err) {
                res.status(500).send("error consultando los usuarios")
            } else {
                res.json(result);
            }
        };

rutasUsuarios.route('/usuarios').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /usuarios");
    queryAllUsers(genericCallback(res));
   
});

rutasUsuarios.route('/usuarios').post((req, res)=>{
    crearUsuario(req.body, genericCallback(res));
});

rutasUsuarios.route('/usuarios/self').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /usuarios/self");
    consultarOCrearUsuario(req, genericCallback(res));
    //consultarUsuario(req.params.id, genericCallback(res));
});

rutasUsuarios.route('/usuarios/:id').get((req,res)=>{
    console.log("Alguien hizo get en la ruta /usuarios");
    consultarUsuario(req.params.id, genericCallback(res));
});

rutasUsuarios.route('/usuarios/:id').patch((req, res)=>{
    editarUsuario(req.params.id, req.body, genericCallback(res));
});

rutasUsuarios.route('/usuarios/:id').delete((req, res)=>{
    elimiarUsuario(req.params.id, genericCallback(res))
});

export default rutasUsuarios;
import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
import Cors from 'cors';


dotenv.config({path: './.env'});

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



const app = Express();
app.use(Express.json());
app.use(Cors());


app.get('/productos', (req,res)=>{
    console.log("Alguien hizo get en la ruta /productos");
    baseDeDatos
        .collection('producto')
        .find({})
        .limit(50)
        .toArray((err, result)=>{
        if (err) {
            res.status(500).send("error consultando los productos")
        } else {
            res.json(result);
        }
    });
   
});

app.post('/productos/nuevo',(req, res)=>{
    console.log(req);
    const datosProducto = req.body;
    console.log("Llaves:", Object.keys(datosProducto));
    if (
        Object.keys(datosProducto).includes('name') &&
        Object.keys(datosProducto).includes('package') &&
        Object.keys(datosProducto).includes('presentation') &&
        Object.keys(datosProducto).includes('price')) 
        {
             //implementar codigo para crear el producto en la db
            baseDeDatos.collection('producto').insertOne(datosProducto, (err, result)=>{
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result)
                    res.status(200);
                }
            });
             res.sendStatus(200)
    } else {
            res.sendStatus(500)
    }
});

app.patch('/productos/editar', (req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    };
    baseDeDatos
        .collection('producto')
        .findOneAndUpdate(
            filtroProducto,
            operacion,
            {upsert:true, returnOriginal:true},
            (err, result)=>{
                if (err) {
                    console.error("error actualizando el producto", err);
                    res.sendStatus(500);
                } else {
            console.log("producto actualizado con éxito")
            res.sendStatus(200);
        }
    })
});

app.delete('/productos/eliminar', (req, res)=>{
const filtroProducto = {_id: new ObjectId(req.body.id)};
baseDeDatos.collection('producto').deleteOne(filtroProducto, (err, result)=>{
    if (err) {
        console.error(err);
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
})
});

let baseDeDatos;

const main = ()=>{
    client.connect((err, db)=>{
        if (err) {
            console.error("error conectando a la base de datos")
        } 
        baseDeDatos = db.db('Productos');
        console.log("Conexión existosa a la baseDeDatos")
        return app.listen(process.env.PORT, ()=>{
            console.log(`Escuchando en el puerto ${process.env.PORT}`);
        });
    });

}

main();
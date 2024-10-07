import express from 'express';
import cors from 'cors';
import coon from './db/coon.js' 

//import Rotas

import UserRoutes from "./routes/UserRoutes.js"

coon();
const app = express();

app.use(cors()); 

//config json response

app.use(express.json());

//solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//public folder for images ;
app.use(express.static(`public`))

//Routes 
app.use('/users', UserRoutes)

app.listen(5000, function(){
    console.log("Servidor Online!!");
});
import express from "express"
import cors from "cors" 
import db from "./database/db.js"
import userRouter from "./routes/userRoutes.js"
import gamesRouter from "./routes/gamesRoutes.js"
import predictionsRouter from "./routes/predictionsRoutes.js"
import { PORTAPI } from "./config/config.js"



const app = express()
app.use(cors())
app.use (express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/users",userRouter);
app.use("/predictions",predictionsRouter);
app.use("/games",gamesRouter);

try {
    await db.authenticate()
    console.log("conexion a la BD OK")
} catch (error) {
    console.log(`conexion fallida por el error ${error}`)
}

const port = PORTAPI //8000
app.listen(port,()=>{
    console.log(`Servidor ok en el puerto ${port}`)
})
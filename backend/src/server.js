//vamos a crear el servidor con express

//en esta seccion importamos
import express from "express"
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

//este import es para solucionar un problema de dns en windows
import dns from "node:dns/promises";








//creamos la funcion express
const app = express();

//conexion a la base de datos
//solucionar problema de dns en windows
dns.setServers(["1.1.1.1"]);
connectDB();
app.get("/", (req,res) => res.send("API is running..."))

app.listen(ENV.PORT, ()=> console.log("Server running on port:", ENV.PORT))



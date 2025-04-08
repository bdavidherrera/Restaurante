/*importamos al framework express */

import express from "express";
import categoriasRoutes from "./routers/categorias.routes.js"

/*Asignamos a app toda funcionalidad para mi server web */

const app = express();

/*setear un puerto ami web server */
app.set("port",8000);

/*routers */

app.use("/api/categorias",categoriasRoutes)

export default app;
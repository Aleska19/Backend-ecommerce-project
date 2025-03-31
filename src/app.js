import express from "express";
import productsRouter from "./routes/products.routers.js"
import routerCart from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars"
import path from "path"
import { dbConection } from "./config/db.connection.js";


const app = express();



// 🛠️ Middlewares
app.use(express.json());  // Permite recibir JSON en las peticiones
app.use(express.urlencoded({ extended: true }));  // Permite recibir datos de formularios

// 📌 Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', routerCart);
app.use('/api/view', viewsRouter);

// 📌 Manejo de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(path.resolve(), 'src/views')); //Establece carpeta de las vistas 
app.set("view engine", "handlebars") //Establece motor de la plantilla



// Middleware para servir archivos estáticos
app.use(express.static(path.join(path.resolve(), 'src/public')));


// 📌 Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// 📌  conexion a la base de datos 
dbConection() // conexion a la base de datos
.then(() => console.log("Conectado a la base de datos"))
.catch((error) => console.log(`Error de conexion a la base de datos: ${error}`)); // si no se conecta a la base de datos lanza un error


export default app;
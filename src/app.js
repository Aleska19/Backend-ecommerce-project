import express from "express";
import productsRouter from "./routes/products.routers.js"
import routerCart from "./routes/carts.router.js";

const app = express();



// 🛠️ Middlewares
app.use(express.json());  // Permite recibir JSON en las peticiones
app.use(express.urlencoded({ extended: true }));  // Permite recibir datos de formularios

// 📌 Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', routerCart);


// 📌 Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


export default app;
import app from "./src/app.js";


// import express from "express"
// import productsRouter from "./src/routes/products.routers.js";
// import routerCart from "./src/routes/carts.router.js";

// const app = express();
const PORT = 8080; 

// app.use(express.json());  // Middleware para procesar JSON
// app.use('/api/products', productsRouter);  // Usa el router de productos
// app.use('api/cart', routerCart);

app.listen(PORT, () =>{
    console.log(`server is running on port http://localhost:${PORT}`);
});
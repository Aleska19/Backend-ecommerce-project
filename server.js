import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import ProductService from "./src/services/product.service.js";




// const app = express();
const PORT = 8080; 
const server = createServer(app); //Creamos el servidor con la app de express
const io = new Server(server); // creamos el servidor de socket.io con el srvidor exppress


//Products Service 
// const productService = new ProductService();

//Variable global para almacenar los productos




// 🔹 Middleware para compartir `io` con los controladores 

app.set('io', io) //

io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // socket.on("nuevoProducto", (data) => {
    //     console.log("Nuevo producto recibido", data);
    //     const newProducts =   productService.addProduct(data) //agregar producto 
    //     io.emit("productos", newProducts); // Enviar actualización a todos los clientes
    // });

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

server.listen(PORT, () =>{
    console.log(`server is running on port http://localhost:${PORT}`);
});
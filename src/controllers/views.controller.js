import ProductService from "../services/product.service.js";

const productService = new ProductService(); 

export const getProducts = (req, res) => {
    try {
            const products = productService.getProducts(); //importamos el metodo getProducts de productService
            res.render("home", { products });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

//con webSockets

export const getProductsRealTime = async (req, res) =>{
    const products = await productService.getProducts();
    res.render("realTimeProducts", {products}) ; 
}

export const addProduct = async (req, res) => {
    try {
        const newProduct = await  productService.addProduct(req.body);
        const io = req.app.get('io'); // socket.io
        io.emit("productos", newProduct);  // Emitir el nuevo producto
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}





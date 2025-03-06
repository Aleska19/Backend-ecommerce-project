import ProductService from "../services/product.service.js";



const productService = new ProductService();
//get all products
export const getProducts = (req, res) =>{
    const {limit} = req.query;
    const products = productService.getProducts(limit);
    res.json(products);
}


export const getProductsById = (req, res) => {
    
    const product = productService.getProductsById(req.params.pid);
    if (!product) return res.status(404).json({ error : 'product id not found'});
    res.json(product);
    
}


export const addProduct = (req, res) =>{
    try {
        const newProduct = productService.addProduct(req.body);
        res.status(201).json(newProduct)
    } catch (error){
        res.status(400).json({error: error.message})    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await productService.deleteProduct(parseInt(pid));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


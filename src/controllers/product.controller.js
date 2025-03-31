 import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const getProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productService.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsById = async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await productService.getProductsById(pid);
        if (!products) return res.status(404).json({ error: 'product id not found' });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updateProduct = await productService.updateProduct(pid, req.body);
        if (!updateProduct) return res.status(404).json({ error: 'product id not found' });
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await productService.deleteProduct((pid));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






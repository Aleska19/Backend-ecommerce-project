import { Router } from "express";
import { getProducts, getProductsById, addProduct, deleteProduct } from "../controllers/product.controller.js"; 


const router = Router();



//Endpoint to get all products
router.get('/', getProducts);


// Endpoint to get product by id 
router.get('/:pid', getProductsById); 

// Endpoint to post add product 
router.post('/add', addProduct);

// Endpoint to delete product by id
router.delete('/:pid', deleteProduct);


export default router; 
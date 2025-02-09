import { Router } from "express";
import { getProducts, getProductsById, addProduct } from "../controllers/product.controller.js"; 


const router = Router();



//Endpoint to get all products
router.get('/', getProducts);


// Endpoint to get product by id 
router.get('/:pid', getProductsById); 

// Endpoint to post add product 
router.post('/add', addProduct);


export default router; 
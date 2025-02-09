import {Router} from 'express'

import { createCart, getCartById, addProductToCart } from '../controllers/cart.controller.js';


const router = Router();


// Endpoint to post create cart ---> crear carrito 
router.post('/', createCart)


// Endpoint to get cart by id 
router.get('/:cid', getCartById)


// EndPoint to post add product to cart 
router.post('/:cid/product/:pid', addProductToCart)


export default router;
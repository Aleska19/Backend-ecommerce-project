import CartService from "../services/cart.service.js";


const cartService = new CartService();

//crear un nuevo carrito

export const createCart = (req, res) =>{
        try {
            const newCart = cartService.createCart();
            res.status(201).json(newCart)
        } catch (error){
            res.status(400).json({error: error.message})
        }
};


//obtener producto de un carrito por id 

export const getCartById = (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const products = cartService.getCartById(cartId);
        res.status(200).json({ cartId, products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

};


//agregando producto a un carrito 
export const addProductToCart = (req, res) =>{
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const { quantity } = req.body;

        const updatedCart = cartService.addProductToCart(cartId, productId, quantity || 1);
        res.status(200).json({ message: "Producto agregado al carrito", cart: updatedCart });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
import fs from 'fs';
import path from 'path';
const dbPath = path.resolve('src/database/cart.json.js')


class CartService {
    constructor(){

        this.ensureFileExists();
        this.carts = this.loadCart();
    }


     // Verifica si `carts.json` existe; si no, lo crea vacío.
    ensureFileExists() {
        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, "[]");
        }
    }

    loadCart () {
        if(!fs.existsSync(dbPath)) return [];
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    }

    saveCart(){
        fs.writeFileSync(dbPath, JSON.stringify(this.carts, null, 2));
    }

    //crear nuevo carrito 
    createCart(){
        const newId = this.carts.length ? this.carts[this.carts.length - 1]?.id + 1 : 1;

        const newCart = {
            id: newId, 
            products: [],
        }

        this.carts.push(newCart);
        this.saveCart();
        return newCart

    }

    // obtener productos de un carrito especifico  con el id 
    getCartById(cartId){
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) throw new Error(`Carrito con id ${cartId} no encontrado`);
        return cart.products;
    }

    //Agregar un producto a un carrito en especifico con el id 
    addProductToCart(cartId, productId, quantity = 1){
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) throw new Error(`Carrito con id ${cartId} no encontrado`);

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity; // Incrementa cantidad
        } else {
            cart.products.push({ products: productId, quantity });
        }

        this.saveCart();
        return cart;
    }

    
}

export default CartService;

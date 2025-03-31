import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// const dbPath = path.resolve('src/database/product.json'); 
import { Products } from '../models/product.model.js';


class ProductService {
    constructor(){

        
    }

    // loadProducts(){
    //     if(!fs.existsSync(dbPath)) return [];
    //     const data = fs.readFileSync(dbPath, 'utf-8');
    //     return JSON.parse(data);
    // }

    // saveProducts(){
    //     fs.writeFileSync(dbPath, JSON.stringify(this.products, null, 2));
    // }

    //📌obtener productos con o sin limite
    async getProducts(limit){
        return limit ? await Products.find().limit(limit) : await Products.find();
    }

    //📌obtener producto en tiempo real
    async getProductsRealTime(){
        return this.products;
    }

    //📌obtener producto por id 
    async getProductsById(productId){
        return await Products.findById(productId);
    }

    //📌Agregar producto a la base de datos 
    async addProduct(data){
        const { title, price, description, code, status,  stock, category, thumbnails} = data
        if (!data.title || !data.price || !data.description || !data.code || !data.stock || !data.category) {
            throw new Error('All fields are required except thumbnail');
        }

        // const newId = this.products.length ? this.products[this.products.length - 1]?.id + 1 : 1;

        const newProduct = new Products({
            // id: newId,
            
            title,
            price,
            description,
            code,
            status: status ?? true,
            stock,
            category,
            thumbnails : thumbnails || [],
        });

        return await newProduct.save();


        // this.products.push(newProduct);
        // this.saveProducts();
        // return newProduct;
    }

    //📌Actualizar un producto
    async updateProduct(productId, data){
        return await Products.findByIdAndUpdate(productId, data, { new: true});
    }

    //📌DELETE PRODUCT
    async deleteProduct(productId){
        // const id = Number(productId);
        // const index = this.products.findIndex(product => product.id === id);
        const objectId = new mongoose.Types.ObjectId(productId);

        const deletedProduct = await Products.findByIdAndDelete(objectId);
        if (!deletedProduct){
            throw new Error(`Product with id ${productId} not found`);
        }
        return { message: `Product with id ${productId} has been deleted` };
            
    }

    
}

export default ProductService;






import fs from 'fs';
import path from 'path';
const dbPath = path.resolve('src/database/product.json'); 

class ProductService {
    constructor(){
        this.products = this.loadProducts();
    }

    loadProducts(){
        if(!fs.existsSync(dbPath)) return [];
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    }

    saveProducts(){
        fs.writeFileSync(dbPath, JSON.stringify(this.products, null, 2));
    }

    getProducts(limit){
        return limit ? this.products.slice(0, limit) : this.products;
    }

    async getProductsRealTime(){
        return this.products;
    }

    

    getProductsById(productId){
        return this.products.find(product => product.id == productId);
    }

    async addProduct(data){
        if (!data.title || !data.price || !data.description || !data.code || !data.stock || !data.category) {
            throw new Error('All fields are required except thumbnail');
        }

        const newId = this.products.length ? this.products[this.products.length - 1]?.id + 1 : 1;

        const newProduct = {
            id: newId,
            title: data.title,
            price: data.price,
            description: data.description,
            code: data.code,
            status: data.status ?? true,
            stock: data.stock,
            category: data.category,
            thumbnails : data.thumbnails || [],
            
        }


        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    //DELETE PRODUCT
    async deleteProduct(productId){
        const id = Number(productId);
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1){
            throw new Error(`Product with id ${productId} not found`);  
        }
        this.products.splice(index, 1);
        this.saveProducts();
        return { message: `Product with id ${productId} has been deleted` };
            
    }

    
}

export default ProductService;





import mongoose, { Schema, model } from "mongoose";
import { type } from "os";

const ProductSchema = new Schema({
    title : { type : String, required : true},
    price : { type : Number, required : true},
    description : { type : String, required : true},
    code : { type : String, required : true},
    status : { type : Boolean, default : true},
    stock : { type : Number, required : true},
    category : { type : String, required : true},
    thumbnail : { type : [String], default : []},

})

export const Products =  model("products", ProductSchema);

//con el productsModel voy a obtener todos los metodos del modelo de mongoose 
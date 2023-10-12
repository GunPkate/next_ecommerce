import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    product : {type: String, required: true},
    description : String,
    price : {type: Number, required: true},
})

export const Product = mongoose.model('product',ProductSchema)
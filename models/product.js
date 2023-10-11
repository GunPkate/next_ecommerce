import {Schema} from "mongodb";

const ProductSchema = new Schema({
    product : {type: String, required: true},
    description : string,
    price : {type: Number, required: true},
})

export const Product = model('product',ProductSchema)
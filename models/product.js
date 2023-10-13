import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    product : {type: String, required: true},
    description : String,
    price : {type: Number, required: true},
})

//fix overwrite collection (use Schema multiple time)
console.log("ccc",mongoose.models)
export const Product = mongoose.models.Product || mongoose.model('Product',ProductSchema)
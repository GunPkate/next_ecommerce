import mongoose from "mongoose"
import clientPromise from "@/lib/mongodb";
import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req,res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === "POST"){
        const {product,description,price} = req.body;
        const productDoc = await Product.create({
            product,description,price
        })
        res.json(productDoc)
    }
}
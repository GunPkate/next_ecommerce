import mongoose from "mongoose"
import clientPromise from "@/lib/mongodb";
import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req,res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method ==="GET"){

        if(req.query?.id){
            res.json( await Product.findOne({_id:req.query.id}));
        } else {
            res.json( await Product.find());
        }
    }

    if(method === "POST"){
        const {product,description,price} = req.body;
        const productDoc = await Product.create({
            product,description,price
        })
        res.json(productDoc)
    }

    if(method === "PUT"){
        const {_id,product,description,price} = req.body;
        await Product.updateOne({_id},{product,description,price})
        res.json("true")
    }
}
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categories";

export default async function handel(req,res){
    const {method} = req
    await mongooseConnect();

    if(method === "POST"){
        const {name,parentCategories} = req.body
        const categoryDoc = await Category.create({name,parent: parentCategories})
        res.json(categoryDoc)
    }

    if(method === "PUT"){
        const {name,parentCategories,_id} = req.body
        const categoryDoc = await Category.updateOne({_id},{name,parent: parentCategories})
        res.json(categoryDoc)
    }

    if(method === "GET"){
        const categoryDoc = await Category.find().populate('parent');
        res.json(categoryDoc);
    }

    if(method === "DELETE"){
        const {_id} = req.query
        await Category.deleteOne({_id})
        res.json("true")
    }
}
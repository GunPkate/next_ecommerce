import { Category } from "@/models/categories";

export default function handel(req,res){
    const {method} = req

    if(method === "POST"){
        const {name} = req.body
        const categoryDoc = Category.create({name})
        res.json(categoryDoc)
    }
}
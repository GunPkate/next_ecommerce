import mongoose from "mongoose"
import clientPromise from "@/lib/mongodb";

export default function handle(req,res) {
    const {method} = req;

    // mongoose.connect(clientPromise.url)
    if(method === "POST"){
        res.json("POST")
        res.json("POST")
        console.log(req)
    }
}
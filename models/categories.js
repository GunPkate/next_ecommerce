import { ObjectId } from "mongodb";
import mongoose, { Schema, models, model } from "mongoose";

const CategorySchema = new Schema({
    name : {type : String, require: true},
    parent: {type : mongoose.Types.ObjectId},
})

export const Category = models?.Category || model('Category',CategorySchema);
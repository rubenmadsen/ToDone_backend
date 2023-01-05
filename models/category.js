const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    parent:{type:String, required:true},
    title:{type:String,required:false},
    position:{type:Number,required:false,default:0}
},{timestamps:true});

const Category = mongoose.model("category",categorySchema,"CATEGORIES");
module.exports = Category;
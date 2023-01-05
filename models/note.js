const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    parent:{type:String, required:true},
    content:{type:String, required:false},
    title:{type:String,required:false}
},{timestamps:true});

const Note = mongoose.model("note",noteSchema,"NOTES");
module.exports = Note;
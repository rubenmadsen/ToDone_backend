const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Category = require("./models/category");
const Note = require("./models/note");
const User = require("./models/user");
const { rawListeners } = require("./models/category");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

const con = mongoose.connect("mongodb://ip.rubenmadsen.com:27017/DATA").then(result => {
    app.listen(port,function(){
        console.log("Connected to mongo.");
        console.log("Backend running...");
    });
})



app.get('/',function(req,res){
    res.status(200).send({"message":new Date().toUTCString()})
});

app.get('/users',function(req,res){
    User.find().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(401).send({"message":"knas"});
    })
})
app.get('/cats',function(req,res){
    Category.find().then(result => {
        res.send(result);
    });
});
app.get('/cat/:title',function(req,res){
    Category.exists({"title":req.params.title}).then(result =>{
        if(result != null){
            // Category already exits
            res.status(401).send({"message":"Category alread exist for user"})
        }
        else{
            // Add category

            Category.create({"parent":"ruben","title":req.params.title}).then(result =>{
                res.status(200).send(result)
            }).catch(err => {
                res.status(400).send(err)
            })
        }
    })
});
app.get('/gen',function(req,res){
    User.create({"username":"ruben","password":"1234"}).then(result => {
        console.log(result);
        res.status(200).send({"message":"ok"})
    }).catch(err => {
        console.log("Error",err);
        res.status(401).send({"message":"riktigt sämst"})
    })
});
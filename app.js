//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-kalyan:kalyanmoy.borah1@cluster0-jasiy.mongodb.net/customerDB", {useNewUrlParser: true, useUnifiedTopology: true});

const customerSchema = new mongoose.Schema({
  email: String,
  name: String,
  date: Date
});

const Customer = mongoose.model("Customer", customerSchema);

app.get("/", function(req, res){
  res.render("home");
});


app.get("/reservation", function(req, res){
  res.render("reservation");
});

app.post("/reservation", function(req, res){


  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    date: req.body.date
  });


    if(customer.email == "" || customer.name == "" || customer.date == null){
      res.render("reservation");
    }else{
      customer.save(function(err){
        if(!err){
          res.render("confirmation");
        }
      });

    }




});









app.listen(3000, function(){
  console.log("Server started on port 3000.");
});

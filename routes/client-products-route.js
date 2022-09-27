const express = require("express")

const route = express.Router()

const clientProductsController = require("../controllers/client-products-Contorller")

route.get("/home", function(req,res){
    res.redirect("/")
})
route.get("/", clientProductsController.getAllProducts )

route.get("/product/detail/:id", clientProductsController.getProductDetail)

route.get("/cart", function(req,res){
    res.render("error/have-to-login")
})

route.get("/cart/:id", clientProductsController.getCart)

route.post("/product/detail/:userid", clientProductsController.saveToCart)


module.exports = route
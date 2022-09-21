const express = require("express")

const route = express.Router()

const productController = require("../controllers/product-Controller")

route.get("/",function(req,res){
    res.redirect("/home")
})

route.get("/home",productController.getHome)

route.get("/admin/products", productController.getMangageProducts)

route.get("/admin/products/:id",productController.updateProducts)

route.post("/admin/products",productController.manageProducts)


module.exports = route
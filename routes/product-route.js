const express = require("express")

const route = express.Router()

const productController = require("../controllers/product-Controller")
const multerMiddleware = require("../middleware/fileUpload")

route.get("/",function(req,res){
    res.redirect("/home")
})

route.get("/home",productController.getHome)

route.get("/admin/products", productController.getManageProducts)

route.post("/admin/products",multerMiddleware,productController.manageProducts)




module.exports = route
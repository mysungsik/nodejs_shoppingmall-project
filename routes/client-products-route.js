const express = require("express")
const route = express.Router()

const clientProductsController = require("../controllers/client-products-Contorller")


route.get("/welcome", function(req,res){
    res.render("customer/nonauth/welcome")
})
route.get("/", clientProductsController.getAllProducts)

// 검색 라우트
route.get("/searchProducts", clientProductsController.getsearchProducts)

route.post("/searchProducts" , clientProductsController.searchProducts)

route.get("/get-all-products",clientProductsController.getAllProductsForJs )

route.get("/product/detail/:id", clientProductsController.getProductDetail)

route.post("/product/detail/:userid", clientProductsController.saveToCart)

route.get("/productQuantity", clientProductsController.productQuantity)

route.get("/cart", function(req,res){
    res.render("error/have-to-login")
})

route.get("/cart/:id", clientProductsController.getCart)

route.get("/cart/:productid/productDelete", clientProductsController.deleteProductOne )

route.post("/cart/:userid", clientProductsController.cartToOrderToSave )



module.exports = route
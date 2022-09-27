const express = require("express")

const route = express.Router()

const productController = require("../controllers/product-Controller")
const multerMiddleware = require("../middleware/fileUpload")


route.get("/admin/allproducts",productController.getAllProducts)

route.get("/admin/products", productController.getManageProducts)

route.post("/admin/products",multerMiddleware,productController.manageProducts)

route.get("/admin/products/Upadte/:id", productController.getupdateProducts)

route.post("/admin/products/Update/:id",multerMiddleware, productController.updateProducts)

route.delete("/admin/products/Update/:id", productController.deleteProduct)






module.exports = route
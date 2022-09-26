const express = require("express")

const route = express.Router()

const clientProductsController = require("../controllers/client-products-Contorller")

route.get("/", clientProductsController.AllProducts )

// route.get("/products/Detail/:id", )

module.exports = route
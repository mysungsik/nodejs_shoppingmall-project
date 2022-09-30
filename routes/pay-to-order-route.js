const express = require("express")
const route = express.Router()

const orderController = require("../controllers/pay-to-order-Controller")


route.get("/order/:userid" , orderController.getOrder)

module.exports = route
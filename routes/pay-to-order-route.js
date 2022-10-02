const express = require("express")
const route = express.Router()

const orderController = require("../controllers/pay-to-order-Controller")


route.get("/order/:userid" , orderController.getOrder)

route.post("/order/:userid",orderController.saveInAdminOrder )

route.get("/all-order/:userid", orderController.getAllOrderForClient)

route.get("/order-detail/:orderid", orderController.getOrderDetail )

// 가져와야하는거 => 주문번호를 만족하는,

module.exports = route
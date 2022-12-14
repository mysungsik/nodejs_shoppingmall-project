const express = require("express")
const route = express.Router()

const mangeOrder = require("../controllers/admin-order-controller")

route.get("/admin/order", mangeOrder.getManageOrder)

route.post("/admin/order/:orderid", mangeOrder.updatingOrderStatus)


module.exports = route
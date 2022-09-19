const express = require("express")
const route = express.Router()
const clientController = require("../controllers/clientController")

route.get("/",clientController.getLogin)


module.exports = route
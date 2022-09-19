const express = require("express")
const route = express.Router()

const clientController = require("../controllers/auth-Controller")

route.get("/login",clientController.getLogin)

route.get("/signup",clientController.getSignup)

route.post("/signup",clientController.signup)


module.exports = route
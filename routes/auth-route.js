const express = require("express")
const route = express.Router()

const authController = require("../controllers/auth-Controller")

route.get("/login",authController.getLogin)

route.post("/login",authController.login)

route.get("/signup",authController.getSignup)

route.post("/signup",authController.signup)


module.exports = route
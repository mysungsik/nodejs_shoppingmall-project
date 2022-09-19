const express = require("express")

const route = express.Router()

const clientController = require("../controllers/s-Controller")

route.get("/",function(req,res){
    res.redirect("/home")
})

route.get("/home",clientController.getHome)

module.exports = route
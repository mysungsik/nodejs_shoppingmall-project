const db =require("../database/database")
const bcrypt = require("bcrypt")
const userModel = require("../models/user-model")
const util = require("../util/auth-controller-validation")

function getSignup(req,res){
    res.render("customer/auth/signup")
}

async function signup(req,res){

    if(util.signupValidation(req.body.email,
        req.body.emailC,
        req.body.password,
        req.body.passwordC,
        req.body.username,
        req.body.street,
        req.body.postal,
        req.body.country)){
        return res.redirect("/signup")
    }

    const userInfo = new userModel(
        req.body.email,
        req.body.password,
        req.body.username,
        req.body.street,
        req.body.postal,
        req.body.country)

    await userInfo.insertUserInfo()

    res.redirect("/login")
}

function getLogin(req,res){
    res.render("customer/auth/login")
}



async function login(req,res){
    const enteredUserEmail = req.body.email;
    const enteredUserPassword = req.body.password;
    
    const existUser = await db.getDb().collection("userInfo").findOne({email:enteredUserEmail})

    if(!existUser){
        return res.redirect("/login")
    }

    const checkPassword = await bcrypt.compare(enteredUserPassword, existUser.password)

    if(!checkPassword){
        return res.redirect("/login")
    }

    res.redirect("/home")
}



module.exports = {
    getLogin:getLogin,
    getSignup:getSignup,
    signup:signup,
    login:login
}

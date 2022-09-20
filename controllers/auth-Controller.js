const db =require("../database/database")
const bcrypt = require("bcrypt")
const userModel = require("../models/user-model")
const util = require("../util/auth-controller-validation")

function getSignup(req,res){

    const userWrongData = util.userWrongData(req)

    res.render("customer/auth/signup" ,{userInfo:userWrongData})
}

async function signup(req,res){

    if(util.signupValidation(req.body.email,req.body.emailC,req.body.password,req.body.passwordC,
        req.body.username,req.body.street,req.body.postal,req.body.country)){

        req.session.userInfoSession = {
            email: req.body.email,
            emailC : req.body.emailC,
            password: req.body.password,
            passwordC: req.body.passwordC,
            username: req.body.username,
            street: req.body.street,
            postal : req.body.postal,
            country : req.body.country
        }
        return res.redirect("/signup")
    }

    const userInfo = new userModel(
        req.body.email,req.body.password,req.body.username,
        req.body.street,req.body.postal,req.body.country)

    await userInfo.insertUserInfo()

    res.redirect("/login")
}

function getLogin(req,res){
    res.render("customer/auth/login")
}


async function login(req,res){
    const userInfo = new userModel(req.body.email,req.body.password)

    const existUser = await userInfo.getUserWithSameEmail();

    if(!existUser){
        return res.redirect("/login")
    }

    const checkPassword = await userInfo.hashedPassword(existUser.password)

    if(!checkPassword){
        return res.redirect("/login")
    }

    req.session.user = {
        email : existUser.email,
        username : existUser.name
    }
    req.session.isAuthenticated = true;

    res.redirect("/home")
}

async function logout(req,res){
    req.session.user = null
    req.session.isAuthenticated = false

    res.redirect("/login")
}


module.exports = {
    getLogin:getLogin,
    getSignup:getSignup,
    signup:signup,
    login:login,
    logout:logout
}

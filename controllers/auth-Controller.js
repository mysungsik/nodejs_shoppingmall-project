const userModel = require("../models/user-model")
const util = require("../util/auth-controller-validation")
const utilSession = require("../util/auth-contorller-createAuthSession")

function getSignup(req,res){

    const userWrongData = util.userWrongDataFlashing(req)

    res.render("customer/auth/signup" ,{userInfo:userWrongData})
}

async function signup(req,res){

    if(util.signupValidation
        (req.body.email,req.body.emailC,req.body.password,req.body.passwordC,
        req.body.username,req.body.street,req.body.postal,req.body.country))
        {
        req.session.userInfoSession = util.userWrongDataReturn(req,"please, Check your info")
        req.session.save(function(){
            res.redirect("/signup")        
        })
        return
    }
    
    const userInfo = new userModel(
        req.body.email,req.body.password,req.body.username,
        req.body.street,req.body.postal,req.body.country)

    const sameEmailCheck = await userInfo.getUserWithSameEmail()

    if(sameEmailCheck){
        req.session.userInfoSession = util.userWrongDataReturn(req, "already exist same id")
        req.session.save(function(){
            res.redirect("/signup") 
        })
        return
    }

    try{
        await userInfo.insertUserInfo()
    }catch(error){
        next(error)
        return
    }

    res.redirect("/login")
}

function getLogin(req,res){
    
    let userInfo = util.loginWrongDataFlashing(req)

    res.render("customer/auth/login" ,{userInfo:userInfo})
}


async function login(req,res){
    const userInfo = new userModel(req.body.email,req.body.password)

    const existUser = await userInfo.getUserWithSameEmail();

    if(!existUser){
        userInfo.userWrongData(req,"check your info")
        res.redirect("/login")
        return
    }

    const checkPassword = await userInfo.hashedPassword(existUser.password)

    if(!checkPassword){
        userInfo.userWrongData(req,"check your info")
        res.redirect("/login")
        return 
    }

    utilSession.createSession(req,existUser,function(){
        res.redirect("/login")
    })
    
}

async function logout(req,res){
    req.session.authUserId = null
    req.session.isAuthenticated = false
    req.session.admin = false

    res.redirect("/login")
}


module.exports = {
    getLogin:getLogin,
    getSignup:getSignup,
    signup:signup,
    login:login,
    logout:logout
}

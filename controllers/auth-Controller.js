const db =require("../database/database")
const bcrypt = require("bcrypt")

function getSignup(req,res){
    res.render("customer/auth/signup")
}

async function signup(req,res){
    const enteredUserEmail = req.body.email;
    const enteredUserEmailC = req.body.emailC;
    const enteredUserPassword = req.body.password;
    const enteredUserPasswordC = req.body.passwordC;
    const enteredUserName = req.body.username;
    const enteredUserAddress= req.body.address;
    const enteredUserPostal = req.body.postal;
    const enteredUserCountry = req.body.country;

    const hashedPassword = await bcrypt.hash(enteredUserPassword,12)

    if(!enteredUserEmail ||
        !enteredUserPassword ||
        !enteredUserName ||
        !enteredUserAddress ||
        !enteredUserPostal ||
        !enteredUserCountry ||
        enteredUserEmail !== enteredUserEmailC ||
        enteredUserPassword !== enteredUserPasswordC ||
        enteredUserPassword.trim() < 6){
            return res.redirect("/signup")
    }
    const data = {
        email:enteredUserEmail,
        password:hashedPassword,
        name:enteredUserName,
        address :enteredUserAddress,
        postal:enteredUserPostal,
        country:enteredUserCountry
    }

    await db.getDb().collection("userInfo").insertOne(data)

    res.redirect("/login")
}

function getLogin(req,res){
    res.render("customer/auth/login")
}



module.exports = {
    getLogin:getLogin,
    getSignup:getSignup,
    signup:signup
}

function signupValidation(email,emailC,password,passwordC,name,street,postal,country){
    return !email ||
    !password ||
    !name ||
    !street ||
    !postal ||
    !country ||
    email !== emailC ||
    password !== passwordC ||
    password.trim() < 6
}

function userWrongDataFlashing(req){
    let userWrongData = req.session.userInfoSession
    
    if(!userWrongData){
        userWrongData ={
            email : "",
            emailC: "",
            password: "",
            passwordC: "",
            username: "",
            street:"",
            postal: "",
            country: "",
            message: ""
        }
    }
    req.session.userInfoSession = null

    return userWrongData
}

function userWrongDataReturn(req,message){
    return {
        email: req.body.email,
        emailC : req.body.emailC,
        password: req.body.password,
        passwordC: req.body.passwordC,
        username: req.body.username,
        street: req.body.street,
        postal : req.body.postal,
        country : req.body.country,
        message: message
    }
}

function loginWrongDataFlashing(req){
    let userInfo = req.session.userInfoSession
    
    if(!userInfo){
        userInfo = {
            email : "",
            password : "",
            message: ""
        }
    }
    req.session.userInfoSession = null

    return userInfo
}

module.exports = {
    signupValidation:signupValidation,
    userWrongDataFlashing:userWrongDataFlashing,
    userWrongDataReturn:userWrongDataReturn,
    loginWrongDataFlashing:loginWrongDataFlashing}
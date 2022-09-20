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

function userWrongData(req){

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
            country: ""
        }
    }
    req.session.userInfoSession = null

    return userWrongData

}


module.exports = {
    signupValidation:signupValidation,
    userWrongData:userWrongData}
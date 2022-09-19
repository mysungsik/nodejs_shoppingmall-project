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

module.exports = {signupValidation:signupValidation}
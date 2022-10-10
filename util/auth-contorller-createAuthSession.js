function createSession(req, user, action){
    req.session.authUserId = user._id.toString()
    
    if(user.admin == true){
        req.session.admin = true
    }
    req.session.isAuthenticated = true;

    req.session.save(action)
}


module.exports = 
    {createSession:createSession}


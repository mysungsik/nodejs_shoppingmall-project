function createSession(req, user, action){

    if(user.admin){
        req.session.admin = true;
    }
    req.session.authUserId = user._id.toString()
    
    req.session.isAuthenticated = true;

    req.session.save(action)
}


module.exports = 
    {createSession:createSession}


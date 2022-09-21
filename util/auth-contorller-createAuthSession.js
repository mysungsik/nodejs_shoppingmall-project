function createSession(req, user, action){
    req.session.authUserId = user._id.toString()
    req.session.isAuthenticated = true;

    req.session.save(action)
}



module.exports = 
    {createSession:createSession}


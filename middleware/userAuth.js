function userAuth(req,res,next){
    const isAuth = req.session.isAuthenticated;

    if(!isAuth){
        return next()
    }

    res.locals.isAuth = isAuth;

    next()
}

module.exports = userAuth
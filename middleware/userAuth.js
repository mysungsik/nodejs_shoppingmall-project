function userAuth(req,res,next){
    const uid = req.session.authUserId
    const isAuth = req.session.isAuthenticated;

    if(!isAuth || !uid){
        return next()
    }

    res.locals.uid = uid;
    res.locals.isAuth = isAuth

    next()
}

module.exports = userAuth
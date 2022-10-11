function userAuth(req,res,next){
    const uid = req.session.authUserId
    const isAuth = req.session.isAuthenticated;
    const admin = req.session.admin;

    if(!isAuth || !uid){
        return next()
    }

    res.locals.uid = uid;
    res.locals.isAuth = isAuth;
    res.locals.admin = admin;

    next()
}

module.exports = userAuth
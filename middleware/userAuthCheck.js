function authCheck(req,res,next){

    if(!req.session.isAuthenticated){
        res.status(401).render("error/401")
        return
    }

    if(req.path.startsWith("/admin") && !req.session.admin){
        res.status(403).render("error/403")
        return
    }
    
    next()
}

module.exports = authCheck

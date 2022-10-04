// 뭔가 잘못되어 지나간 모든 error에 관하여 처리

function errorHandler(error, req,res, next){
    console.log(error)
    res.status(500).render("error/500")
    next();
}

module.exports = errorHandler
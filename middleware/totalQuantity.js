const db = require("../database/database")

async function totalQuantity(req,res,next){

    const data = await db.getDb().collection("cart").find({ userId : res.locals.uid}).toArray()
    let totalquantity = data.length;

    res.locals.totalQuantity = totalquantity;

    next()
}

module.exports = totalQuantity
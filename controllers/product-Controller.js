const db = require("../database/database")
const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId

function getHome(req,res){
    res.render("product/home")
}

async function getMangageProducts(req,res){
    
    const allProduct = await db.getDb().collection("productInfo").find().toArray()
    const checkAdmin = req.session.admin;

    if(!checkAdmin){
        res.redirect("/")
        return
    }
    res.render("admin/manage-products", {allProduct:allProduct})
}

async function manageProducts(req,res){

    const productInfo = {
        img : req.body.productImage,
        name : req.body.productName,
        price : req.body.productPrice,
        detail: req.body.productDetail,
        warning : req.body.productWarning,
        date : req.body.productRegistrationDate 
    }

    await db.getDb().collection("productInfo").insertOne(productInfo)

    res.redirect("/admin/products")
}

async function updateProducts(req,res){
    const productName = req.params.id;

    const item = await db.getDb().collection("productInfo").findOne({productName:productName})

    res.json(item);
}
module.exports = {
    getHome:getHome,
    getMangageProducts:getMangageProducts,
    manageProducts:manageProducts,
    updateProducts:updateProducts
}
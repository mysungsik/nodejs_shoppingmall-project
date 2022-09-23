const db = require("../database/database")
const Product = require("../models/product-model")

function getHome(req,res){
    res.render("product/home")
}

async function getManageProducts(req,res){
    
    const checkAdmin = req.session.admin;

    if(!checkAdmin){
        res.redirect("/")
        return
    }

    res.render("admin/manage-products")
}

async function manageProducts(req,res){

    const data = new Product(
        req.body.productName,
        req.body.productPrice,
        req.body.productSummary,
        req.body.productDetail,
        req.body.productWarning,
        req.file.filename)

    console.log(req.file)
    try{
        await data.save();
    }
    catch(error){
        next(error)
        return;
    }

    res.redirect("/admin/products")
}

module.exports = {
    getHome:getHome,
    getManageProducts:getManageProducts,
    manageProducts:manageProducts
}
const db = require("../database/database")
const Product = require("../models/product-model")

async function getHome(req,res,next){

    try{
        const allProducts = await Product.AllProducts()

        res.render("product/home",{allProducts:allProducts})

    }catch(error){
        console.log(error)
        next(error)
        return
    }
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

    console.log()
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
const Product = require("../models/product-model")

async function AllProducts(req,res,next){
    try{
        const allProducts = await Product.AllProducts()
        res.render("customer/nonauth/products" , {allProducts:allProducts})

    }catch(error){
        next(error)
    }
    
    
}

module.exports = {AllProducts : AllProducts}
const Product = require("../models/product-model")
const Cart = require("../models/cart-model")

async function getAllProducts(req,res,next){
    try{
        const allProducts = await Product.AllProducts()
        res.render("customer/nonauth/products" , {allProducts:allProducts})

    }catch(error){
        next(error)
    }
}

async function getProductDetail(req,res,next){
    const productId = req.params.id

    try{
        const data = new Product(null,null,null,null,null,null,productId)
        const productDetail = await data.findProduct()
        res.render("customer/nonauth/product-detail",{productDetail:productDetail})
    }catch(error){
        next(error)
    } 
}

async function getCart(req,res,next){
    
    if(!res.locals.isAuth || !res.locals.uid){
        res.render("error/have-to-login")
        return
    }

    const allProductsInCart = await Cart.findAllproductsInCart(res.locals.uid)
    
    res.render("customer/auth/cart" , {allProductsInCart:allProductsInCart})
}

async function saveToCart(req,res,next){
    
    if(!res.locals.isAuth){
        res.render("error/have-to-login")
        return
    }

    const userid = req.params.userid;

    const cart = new Cart(userid,req.body.productId,req.body.productName,req.body.productPrice,req.body.productURL)

    await cart.save()

    res.json({message:"success to save cart!"})

}
module.exports = {
    getAllProducts : getAllProducts
    ,getProductDetail:getProductDetail,
    getCart:getCart,
    saveToCart:saveToCart}
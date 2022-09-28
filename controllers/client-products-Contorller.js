const Product = require("../models/product-model")
const Cart = require("../models/cart-model")
const db = require("../database/database")


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
    const cart = new Cart(userid,
        req.body.productId,
        req.body.productName,
        req.body.productPrice,
        req.body.productURL,
        req.body.productImg)

    await cart.save()

    res.json({message:"success to save cart!"})
}


async function cartToOrderToSave(req,res){
    const pageid = req.params.userid

    await db.getDb().collection("order").insertOne({
        userId : pageid,
        productsName :req.body.productNames,
        productsPrice :req.body.productPrices,
        productsQuantity : req.body.productQuantities,
        orderTotalPrice : req.body.productTotalPrice
    })

    res.json({message:"l-ol"})
}

async function deleteProductOne(req,res){
    const productname = req.params.productname

    await db.getDb().collection("cart").deleteOne({productName:productname, userId:res.locals.uid})

    res.redirect(`/cart/${res.locals.uid}`)
}

async function deleteCartlistToOrder(req,res){
    const userid = req.params.userid

    await db.getDb().collection("cart").deleteMany({userId:userid})

    res.json({message:"order complete, delete your cart"})
}


function getOrder(req,res){
    res.render("customer/auth/order")
}


module.exports = {
    getAllProducts : getAllProducts
    ,getProductDetail:getProductDetail,
    getCart:getCart,
    saveToCart:saveToCart,
    getOrder:getOrder,
    deleteProductOne:deleteProductOne,
    cartToOrderToSave:cartToOrderToSave,
    deleteCartlistToOrder:deleteCartlistToOrder}
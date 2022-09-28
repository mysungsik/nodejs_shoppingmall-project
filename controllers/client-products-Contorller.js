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

    const cart = new Cart(userid,req.body.productId,req.body.productName,req.body.productPrice,req.body.productURL)

    await cart.save()

    res.json({message:"success to save cart!"})

}


    // 이름 바꾸고, 다 바꾸고 다시볼것

    //1. 
    // post에는 랜더가 먹히지 않는다.

    // 오더로 넣을때, get order부터 만들고 값을 채워넣는 쪽으로 가보자

    // res.redirect로 움직이면 될듯

    //2
    // 초기값 안나온다. 초기값 나옥[ㅔ 만들어야한다.]

    //3
    // post를 자기자신페이지로 바꾸고, get만들어보고, redirect해보자ㅣ

    //4 
    // redirect가 아니고 그냥 앵커태그로ㅓ 만들었다. 개꿀;

async function postOrder(req,res){
    const pageid = req.params.userid

    await db.getDb().collection("order").insertOne({
        id : pageid,
        names :req.body.productNames,
        products :req.body.productPrices,
        q : req.body.productQuantities,
        p : req.body.productTotalPrice
    })

    res.json({message:"l-ol"})
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
    postOrder:postOrder}
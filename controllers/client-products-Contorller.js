const Product = require("../models/product-model")
const Cart = require("../models/cart-model")

// refacoring 하는것이 더 복잡해서 일단 두었음. (코드 줄이 짧아서)

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



async function deleteProductOne(req,res){
    const productid = req.params.productid

    await new Cart(res.locals.uid,productid).deleteProductOne()
    
    res.redirect(`/cart/${res.locals.uid}`)
}

// async function deleteCartlistToOrder(req,res){

//     await new Cart(res.locals.uid).makeEmptyCart()

//     res.json({message:"order complete, delete your cart"})
// }

async function productQuantity(req,res){
    const quantity = res.locals.totalQuantity

    res.json(quantity)
}

async function cartToOrderToSave(req,res){
    const pageid = req.params.userid
    let bd = req.body;    

    await new Cart(pageid, 
        bd.productIds,
        bd.productNames,
        bd.productPrices,
        bd.productUrl,
        bd.productImgUrl,
        bd.productQuantities,
        bd.productTotalPrice
    ).fromCartToOrder()

    res.redirect(`/order/${pageid}`)
}


module.exports = {
    getAllProducts : getAllProducts
    ,getProductDetail:getProductDetail,
    getCart:getCart,
    saveToCart:saveToCart,
    deleteProductOne:deleteProductOne,
    cartToOrderToSave:cartToOrderToSave,
    productQuantity:productQuantity}
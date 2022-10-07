const Product = require("../models/product-model")
const Cart = require("../models/cart-model")

async function getAllProducts(req,res,next){
    req.session.searchData = null
    
    const pageNumber = req.query.pagenumber

    if(pageNumber){
        try{
            const Datas = await Product.AllProducts()
    
            const allProducts = []
            const start= pageNumber*8 - 8
            let last;
            last = pageNumber*8
        
            if(last>Datas.length){
                last = pageNumber*8 - (8-Datas.length%8)
            }
            
            for(i=start; i <last; i++){
                const newData = Datas[i]
                allProducts.push(newData)
            }
            res.render("customer/nonauth/products" , {allProducts:allProducts})
    
        }catch(error){
            next(error)
        }
    }
}

async function getAllProductsForJs(req,res,next){
    try{
        let allProducts = await Product.AllProducts()
        if(req.session.searchData){
            allProducts = req.session.searchData
        }
        res.json(allProducts)

    }catch(error){
        next(error)
    }
}

// 받아서, req.session 처리 // redirect [search/검색어] - 안먹혀서 자바스크립트에서 강제이동
async function searchProducts(req,res){
    const data = req.body.data
    const searchKeyWord = req.body.searchKeyWord

    req.session.searchData = data

    res.redirect(`/search/?${searchKeyWord}`)
}

//  req.session 처리된 항목들을 렌더
function getsearchProducts(req,res){

    const allProducts =  req.session.searchData
    console.log(allProducts)

    res.render("customer/nonauth/products" , {allProducts:allProducts})

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

async function productQuantity(req,res){
    const quantity = res.locals.totalQuantity

    res.json(quantity)
}

async function cartToOrderToSave(req,res){
    const pageid = req.params.userid
    let bd = req.body;
    
    const initialize = new Cart(pageid) // res.locals.uid 도 언제나환영
    await initialize.initializeOrderDB()

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
    getAllProducts : getAllProducts,
    getAllProductsForJs:getAllProductsForJs
    ,getProductDetail:getProductDetail,
    searchProducts:searchProducts,
    getsearchProducts:getsearchProducts,
    getCart:getCart,
    saveToCart:saveToCart,
    deleteProductOne:deleteProductOne,
    cartToOrderToSave:cartToOrderToSave,
    productQuantity:productQuantity}
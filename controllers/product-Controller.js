const Product = require("../models/product-model")


async function getAllProducts(req,res,next){
    
    // 체크
    const checkAdmin = req.session.admin;

    if(!checkAdmin){
        res.redirect("/")
        return
    }

    try{
        const allProducts = await Product.AllProducts()

        res.render("admin/allProducts",{allProducts:allProducts})

    }catch(error){
        console.log(error)
        next(error)
        return
    }
}

async function getManageProducts(req,res){
    
    //체크
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

    try{
        await data.save();
    }
    catch(error){
        next(error)
        return;
    }
    res.redirect("/admin/products")
}

async function deleteProduct(req,res){

    // admin 체크
    const checkAdmin = req.session.admin;

    if(!checkAdmin){
        res.redirect("/")
        return
    }

    // 찾아서 삭제
    const productId = req.params.id

    const deleteId = new Product(null,null,null,null,null,null,productId)

    await deleteId.deleteProducts()

    res.redirect("/admin/allproducts")
}

async function getupdateProducts(req,res){

    // 체크
    const checkAdmin = req.session.admin;

    if(!checkAdmin){
        res.redirect("/")
        return
    }

    const productId = req.params.id

    const data = new Product(null,null,null,null,null,null,productId)

    const productData = await data.findProduct()

    res.render("admin/update-products",{productData:productData})
}

async function updateProducts(req,res){
    
    const pageId = req.params.id;
    
    const data = req.body;
    const input = [
        data.productName,
        data.productPrice,
        data.productSummary,
        data.productDetail,
        data.productWarning,
        req.file.filename
    ]
    
    const datas = new Product(...input,pageId)

    await datas.save()

    res.redirect(`/admin/allproducts`)
 
}

module.exports = {
    getAllProducts:getAllProducts,
    getManageProducts:getManageProducts,
    manageProducts:manageProducts,
    deleteProduct:deleteProduct,
    getupdateProducts:getupdateProducts,
    updateProducts:updateProducts
}
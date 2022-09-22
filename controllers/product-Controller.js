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


    const data = new Product({
        ...req.body,
    })

    data.image = req.file.filename

    console.log(data.image)
    console.log(data.name)

    // req.body 를 ... 으로 쓰는것 잊지 말것.
    // req.body 에서는 ~ .warning 까지만 오는것을 잊지 말것.
    // 나머지 객체 값들은  req.file 에서 올것이다.
    //  file의 filename 이라는 태그는 저장할때 [ console.log(file) 하면 나온다. ]


    // 근데 image는 req.body 에서도 오는데(이미지파일 업로더) 왜 또 하는거지?, 이유가 있나??? 안쓸거면 왜저장했지

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
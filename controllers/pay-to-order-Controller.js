const PayOrder = require("../models/pay-to-order-model")
const CartModel = require("../models/cart-model")

async function getOrder(req,res){

    const orderData = await PayOrder.getOrder(res.locals.uid)

    res.render("customer/auth/order" ,{orderData:orderData})
}


async function saveInAdminOrder(req,res){
    // orderData는 그대로니까, 주문번호만 추가해서 넘기고
    // userData는 주문자 데이터니까 바뀔수 있으니 req.body로

    let bd = req.body;

    const Data = await CartModel.orderData(res.locals.uid)
    delete Data._id;
    
    const productData = {
        orderId : bd.orderId.toString(),
        ...Data
    }

    const userData = {
        email : bd.email,
        name: bd.username,
        address:{
            street: bd.street,
            postal: bd.postal,
            country: bd.country
        }
    }

    const pay = new PayOrder(productData,userData,"pending","now")
    await pay.saveInAdminOrder()

    await PayOrder.makeEmptyOrder(res.locals.uid)
    await CartModel.makeEmptyCart(res.locals.uid)
    
    res.redirect(`/`)  
}


async function getAllOrderForClient(req,res){

    const basicOrderData = await PayOrder.getListOfAllClientOrderForClient(res.locals.uid)

    res.render("customer/auth/all-your-order" ,{basicOrderData:basicOrderData})
}

async function getOrderDetail(req,res){
    const orderedId = req.params.orderid
    const data = new PayOrder(orderedId)

    const detailProductData = await data.getOrderDetail()

    res.render("customer/auth/order-detail",{detailProductData:detailProductData} )
}


module.exports ={
    getOrder:getOrder,
    saveInAdminOrder:saveInAdminOrder,
    getAllOrderForClient:getAllOrderForClient,
    getOrderDetail:getOrderDetail
}
const PayOrder = require("../models/pay-to-order-model")
const CartModel = require("../models/cart-model")
const stripe = require('stripe')('sk_test_51LpNaFKewLSBpof5bSklhnQxWtZdAABciZHwH6JlPatHR7h4XNIj7Oi7g2Eldc2xX6Z9zLzCyK3P1BvzYEXVzTg600RRSGJq8M');

async function getOrder(req,res){

    const orderData = await PayOrder.getOrder(res.locals.uid)

    res.render("customer/auth/order" ,{orderData:orderData})
}


async function saveInAdminOrder(req,res){
    // orderData는 그대로니까, 주문번호만 추가해서 넘기고
    // userData는 주문자 데이터니까 바뀔수 있으니 req.body로

    let bd = req.body;

    const Data = await CartModel.orderData(res.locals.uid)
    
    const productData = {
        orderId : bd.orderId.toString(),
        ...Data
    }

    const CartDatas = await CartModel.findAllproductsInCart(res.locals.uid)

    const newData = []
    
    for(i=0 ;  i < CartDatas.length; i++){
        newData.push({
            ...CartDatas[i],
            productQuantity : Data.productsQuantity[i]
        })
    }

    // Stripe API를 사용한, 결제시스템 구축

    // 4242 4242 4242 4242 카드번호

    // 오류1. line_items : [ name:1 price:1 quantity:1] ... 
    //        line_itmes : [ name :13 , price: 13, quantity: 13...] 
    //          이런 식으로  line_items가 [각 하나의 값마다] 들어가야 하기 때문에

    //      ==> 들어가는 값은 반드시, 배열 [ name : x, price:y ,quantity : 54] ... [name : vc, price: jk , quantity: 23] ... 처럼 들어가야한다.
    //      ==>> 나는 { name : [ x, y, z], {price : [x, y, z]} ... 식이기 때문에 } 실패

    //      ==> 그렇다면 값을 [order collection이 아니라 ] [ Cart collection 에서 각각 있는 값을 가져오면 되겠다]
    //          단, 내 Cart collection에는 "수량" 이 없으니까 추가하도록하자!

    const userData = {
        email : bd.email,
        name: bd.username,
        address:{
            street: bd.street,
            postal: bd.postal,
            country: bd.country
        }
    }

    // 결제될 정보를 넣고
    // 결제완료 페이지(success) 에 들어가면 저장하도록 하기

    const pay = new PayOrder(productData,userData,"pending","now")
    req.session.ADMINORDER = pay

    await PayOrder.makeEmptyOrder(res.locals.uid)
    await CartModel.makeEmptyCart(res.locals.uid)
    
    const session = await stripe.checkout.sessions.create({
        line_items: newData.map(function(item){
            return{
                price_data : {
                  currency : "usd",
                  product_data : {
                      name : item.productName
                  },
                  unit_amount : +item.productPrice
  
                },
                quantity: +item.productQuantity,
              }
        }),
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`,
    });

    res.redirect(303, session.url)
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

async function paySuccess(req,res){

    // pay가 성공하여, 올바르게 success 페이지에 진입했다면, adminOrder에 넣고, 세션초기화

    console.log(req.session.ADMINORDER)
    await PayOrder.saveInAdminOrder(req.session.ADMINORDER)

    req.session.ADMINORDER = null

    res.render("customer/auth/stripe-success")
}

function payCancel(req,res){
    req.session.ADMINORDER = null
    res.render("customer/auth/stripe-cancel")
}

module.exports ={
    getOrder:getOrder,
    saveInAdminOrder:saveInAdminOrder,
    getAllOrderForClient:getAllOrderForClient,
    getOrderDetail:getOrderDetail,
    paySuccess:paySuccess,
    payCancel:payCancel

}
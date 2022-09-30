const PayOrder = require("../models/pay-to-order-model")

async function getOrder(req,res){

    const orderData = await PayOrder.getOrder(res.locals.uid)

    console.log(orderData)

    res.render("customer/auth/order" ,{orderData:orderData})
}

async function saveInAdminOrder(){

}

module.exports ={
    getOrder:getOrder
}
    
// order - render - 삭제는 언제?
const adminOrderModel = require("../models/admin-order-model")

async function getManageOrder(req,res,next){

    try{
        const allOrderDatas =  await adminOrderModel.getAllOrdersLists()
        res.render("admin/manage-orders" ,{allOrderDatas:allOrderDatas})
    }catch(error){
        console.log(error)
        next()
    }
}

async function updatingOrderStatus(req,res){
    const orderid = req.params.orderid

    const data = new adminOrderModel(null,orderid,req.body.updatingStatus)

    await data.updatingStatus()

    res.json({message:"nice"})
 
}

module.exports = {
    getManageOrder,
    updatingOrderStatus:updatingOrderStatus
}
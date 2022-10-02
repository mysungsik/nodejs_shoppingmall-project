const adminOrderModel = require("../models/admin-order-model")

async function getManageOrder(req,res){

    const allOrderDatas =  await adminOrderModel.getAllOrdersLists()
    res.render("admin/manage-orders" ,{allOrderDatas:allOrderDatas})
}

async function updatingOrderStatus(req,res){
    const orderid = req.params.orderid

    const updatingStatus =  req.body.updatingData.updatingStatus

    const data = new adminOrderModel(null,orderid,updatingStatus)

    await data.updatingStatus()
 
}

module.exports = {
    getManageOrder,
    updatingOrderStatus:updatingOrderStatus
}
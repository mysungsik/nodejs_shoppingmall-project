const db = require("../database/database")

class AdminOrder {
    constructor(userid,orderid,status){
        this.userid = userid,
        this.orderid = orderid
        this.status = status
    }

    static async getAllOrdersLists(){
        const allOrders = await db.getDb().collection("adminOrder").find({},{
            "paidProductData.userId" :1,
            "RecieverData.name" : 1,
            "RecieverData.email" : 1,
            "paidProductData.orderId" :1 ,
            "paidProductData.productsName" :1,
            paidDate:1,
            status:1
        }).toArray()

        return allOrders
    }

    async updatingStatus(){
        await db.getDb().collection("adminOrder").updateOne({"paidProductData.orderId":this.orderid},{$set:{status:this.status}})
    }
}

module.exports = AdminOrder
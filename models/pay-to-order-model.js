const mongoDb = require("mongodb")

const db = require("../database/database")

const UserModel = require("../models/user-model")
const CartModel = require("../models/cart-model")

const ObjectId = mongoDb.ObjectId

class PayOrder{

    // status : panding(대기중) , payment completed(결제완료), send(발송), arrival(도착) 

    constructor(orderedProduct, userData, status = "pending", date){        
        this.orderedProduct = orderedProduct;
        this.userData = userData;
        this.status = status;
        if(date =="now"){
            this.date = new Date().toLocaleDateString("ko-kr") 
        }else{
            this.date = new Date().toLocaleDateString("ko-kr") 
        }
        
    }

    static async getOrder(userid){
        
        // userid는 ObjectId가 아니라 string 형태일것
        const userData = await UserModel.getUserInfoWithoutPassword(userid)
        const orderData = await CartModel.orderData(userid)

        const payData = new PayOrder(orderData,userData)
        return payData
    }

    async saveInAdminOrder(){
        
        await db.getDb().collection("adminOrder").insertOne({
            paidProductData : this.orderedProduct,
            RecieverData : this.userData,
            paidDate: this.date,
            status:this.status
        })
    }

    static async makeEmptyOrder(userid){
        await db.getDb().collection("order").deleteMany({userId:userid})
    }
}

module.exports = PayOrder

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
        this.date = new Date(date).toLocaleDateString("ko-kr") 
        
    }

    static async getOrder(userid){
        
        // userid는 ObjectId가 아니라 string 형태일것
        const userData = await UserModel.getUserInfoWithoutPassword(userid)
        const orderData = await CartModel.orderData(userid)

        const payData = new PayOrder(orderData,userData)
        return payData
    }

    async saveInAdminOrder(){

        // getOrder에서 썻던거 xx 
        // 왜냐면, 주문자 주소, 이름이 변경 될 수 있기 때문에
        // ==> product 정보는 카트(지만 order collection)에서 받아오돼, 
        //      userdata 는 주문자 정보기 때문에 req.body 로 받아와야하고,
        //      status 정보는 기본으로 pending이고,
        //      admin order 페이지 가서 바꿀수 있도록 하자 (DB UPDATE)
        await 

        db.getDb().collection("adminOrder").insertOne({
            

        })
    }
    
}

module.exports = PayOrder

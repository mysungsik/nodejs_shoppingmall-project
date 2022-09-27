const db = require("../database/database")
const fs = require("fs/promises")

const mongoDb = require("mongodb")
const ObjectId = mongoDb.ObjectId

class Cart {
    constructor(userId,productId,productName,productPrice,productUrl){
        this.userId = userId,
        this.productId = productId,
        this.productName = productName,
        this.productPrice = productPrice,
        this.productUrl = productUrl
    }

    async save(){
        await db.getDb().collection("cart").insertOne({
            userId : this.userId,
            prodcutId : this.productId,
            productName: this.productName,
            productPrice : this.productPrice,
            productUrl : this.productUrl
        })
    }

    static async findAllproductsInCart(userid){
        const data = await db.getDb().collection("cart").find({userId:userid}).toArray()
        return data
    }
}

module.exports = Cart;
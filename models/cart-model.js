const db = require("../database/database")
const fs = require("fs/promises")

const mongoDb = require("mongodb")
const ObjectId = mongoDb.ObjectId

class Cart {
    constructor(userId,productId,productName,productPrice,productUrl,productImg,productsQuantity,orderTotalPrice){
        this.userId = userId
        this.productId = productId
        this.productName = productName
        this.productPrice = productPrice
        this.productUrl = productUrl
        this.productImg = productImg
        this.productsQuantity = productsQuantity
        this.orderTotalPrice = orderTotalPrice
    }

    async save(){
        await db.getDb().collection("cart").insertOne({
            userId : this.userId,
            prodcutId : this.productId,
            productName: this.productName,
            productPrice : this.productPrice,
            productUrl : this.productUrl,
            productImg :this.productImg
        })
    }

    static async findAllproductsInCart(userid){
        const data = await db.getDb().collection("cart").find({userId:userid}).toArray()
        return data
    }

    async findOneProduct(){
        await db.getDb().collection("cart").findOne({})
    }
    
    async deleteProductOne(){
        await db.getDb().collection("cart").deleteOne({userId:this.userId, prodcutId:this.productId })
    }

    async makeEmptyCart(){
        await db.getDb().collection("cart").deleteMany({userId:this.userId})
    }
    async fromCartToOrder(){
        await db.getDb().collection("order").insertOne({
            userId : this.userId,
            productsId : this.productId,
            productsName : this.productName,
            productsPrice : this.productPrice,
            productUrl: this.productUrl,
            productImgUrl:this.productImg,
            productsQuantity :  this.productsQuantity,
            orderTotalPrice : this.orderTotalPrice
        })
    }
    static async orderData(userid){
        const orderData = await db.getDb().collection("order").findOne({userId:userid})
        return orderData
    }
}

module.exports = Cart;
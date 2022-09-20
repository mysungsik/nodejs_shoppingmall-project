const db= require("../database/database")
const bcrypt = require("bcrypt")

class User {
    constructor(email,password,name,street,postal,country){
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = {
            street : street,
            postal : postal,
            country : country
        } 
    }

    async insertUserInfo(){

        const hashedPassword = await bcrypt.hash(this.password,12)

        await db.getDb().collection("userInfo").insertOne({
            email : this.email,
            password : hashedPassword,
            name : this.name,
            address : this.address
        })
    }

    async getUserWithSameEmail(){
        return db.getDb().collection("userInfo").findOne({email:this.email})
    }

    async hashedPassword(existUserPassword){
        return bcrypt.compare(this.password,existUserPassword)
       
    }
}

module.exports = User

// findOne, bcrypt의 compare 등은 [자동으로 프로미스를 반환한다.]
// 자동으로 반환된 프로미스는 따로 변수를 지정해서 리턴하지 않아도, 함수의 매서드에 의해 반횐되는 것을 가능하게 만들어준다.
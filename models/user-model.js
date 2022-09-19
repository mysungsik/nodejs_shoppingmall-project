const db= require("../database/database")

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
}

module.exports = User

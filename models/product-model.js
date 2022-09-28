const db = require("../database/database")
const fs = require("fs/promises")

const mongoDb = require("mongodb")
const ObjectId = mongoDb.ObjectId

// 하나하나, constructor에 저장하지 말고, FORM 전체에서 오는 값을 넣기 위해, 파라미터를 넣어본다.
// 또한, 이미지의 이름, 경로, [URL? 이건왜하지] 추가한다.

class Product {
    constructor(name,price,summary,detail,warning,image,id){
        this.name =name;
        this.price = price;
        this.summary = summary;
        this.detail = detail;
        this.warning = warning;
        this.image = image;                                             // 이건 단지 저장될 이미지의 이름일 뿐
        this.imagePath = `src/uploadedImage/${image}`                   // 이미지가 저장된 파일의 경로를 저장
        this.imageUrl = `/products/assets/uploadedImage/${image}`       // 파일의 경로를 숨기며, 이미지에 src에 추가하기위한, URL 추가

        if(id){
            this.id = id.toString()                         // toString() 매서드를 사용했으므로, 없으면 오류남. ==>> 없을경우 if체크로 날려버림
        }

        // 근데 this.image는 [서버에서 저장할때,] req.body 에서도 오는데(이미지파일 업로더) 왜 또 하는거지?, 이유가 있나??? 안쓸거면 왜저장했지
    }

    async save(){
        const data = {
            name :this.name,
            price : +this.price,
            summary : this.summary,
            detail: this.detail,
            warning : this.warning,
            image : this.image
        }

        if(!this.id){
            try{
                await db.getDb().collection("productInfo").insertOne(data)
            }
            catch(error){
                error.code = 404;
                throw error
            }    
        }
        else {
            // 업데이트하기전, productid로, db에서 값을 찾아, 다시 constructor에 넣어, imagePath를 뽑아, 기존에 존재하던 파일을 삭제한다.
            const data = await db.getDb().collection("productInfo").findOne({_id:ObjectId(this.id)})

            if(!data){
                const error = new Error("Could not find product with this Id")
                error.code = 404;
                throw error
            }
            const newData=  new Product(
                data.name,
                data.price,
                data.summary,
                data.detail,
                data.warning,
                data.image,
                data._id
            )
            // 파일 없애고, db 업데이트하고
            await db.getDb().collection("productInfo").updateOne({_id: ObjectId(this.id)},{$set:{  
                name :this.name,
                price : +this.price,
                summary : this.summary,
                detail : this.detail,
                warning :  this.warning,
                image : this.image
            }})
            try{
                await fs.unlink(newData.imagePath)
            } catch(error){
                error.code = 404;
                throw error
            }
        }      
    }

    static async AllProducts() {                                 // 객체의 파라미터 Product(여기!) 를 쓸 이유가 없으므로 static 해서 직접보관
        const data = await db.getDb().collection("productInfo").find().toArray();

        return data.map(function(data){
            return new Product(data.name,
                data.price,
                data.summary,
                data.detail,
                data.warning,
                data.image,
                data._id)
        })
    }

    async deleteProducts(){
        // 삭제하기전, productid로, db에서 값을 찾아, 다시 constructor에 넣어, imagePath를 뽑아, 기존에 존재하던 파일을 삭제한다.

        const data = await db.getDb().collection("productInfo").findOne({_id:ObjectId(this.id)})

        const newData=  new Product(
            data.name,
            data.price,
            data.summary,
            data.detail,
            data.warning,
            data.image,
            data._id
        )

        await fs.unlink(newData.imagePath)

        // 파일 없애고, db없애고

        await db.getDb().collection("productInfo").deleteOne({_id:ObjectId(this.id)})
    }

    async findProduct(){

        const data = await db.getDb().collection("productInfo").findOne({ _id:ObjectId(this.id)})

        const productData = new Product(
            data.name,
            data.price,
            data.summary,
            data.detail,
            data.warning,
            data.image,
            this.id)

        return productData
    }
}



module.exports = Product;

// map까진 완수, 근데, constructor 안의 값이 바뀌질 않는다;
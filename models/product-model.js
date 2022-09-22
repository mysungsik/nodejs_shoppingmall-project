const db = require("../database/database")

// 하나하나, constructor에 저장하지 말고, FORM 전체에서 오는 값을 넣기 위해, 파라미터를 넣어본다.
// 또한, 이미지의 이름, 경로, [URL? 이건왜하지] 추가한다.

class Product {
    constructor(productData){
        this.name = productData.productName;
        this.price = productData.productPrice;
        this.summary = productData.productSummary;
        this.detail = productData.productDetail;
        this.warning = productData.productWarning;
        this.image = productData.productAddImage;                                    // 이건 단지 저장될 이미지의 이름일 뿐
        this.imagePath = `src/uploadedImage/${productData.productAddImage}`         // 이미지가 저장된 파일의 경로를 저장
        this.imageUrl = `/products/assets/images/${productData.productAddImage}`    // 이건 왜인지 꼭 알아내야함

        // 근데 this.image는 [서버에서 저장할때,] 
        //  req.body 에서도 오는데(이미지파일 업로더) 왜 또 하는거지?, 이유가 있나??? 안쓸거면 왜저장했지
    }

    async save(){
        const data = {
            name :this.name,
            price : this.price,
            summary : this.summary,
            detail: this.detail,
            warning : this.warning,
            image : this.image                                  //  DB에 저장은 이미지 이름까지만! [경로랑 URL은 동적으로 할거라..?]
        }
        await db.getDb().collection("productInfo").insertOne(data)
    }
}

module.exports = Product;
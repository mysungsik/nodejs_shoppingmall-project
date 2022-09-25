const multer = require("multer")
const uuid = require("uuid").v4

const upload = multer({

    storage : multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,"src/uploadedImage")                                        // 저장할 곳 위치
        },
        filename(req,file,cb){
            cb(null, uuid() + '-' + file.originalname )                     // 파일이름 혹은 originalname 으로 이름생성
        }                                                                   // + 고유해야하므로 uuid 설치하여, 이름 앞에 붙여줌
    })  
})

const multerMiddleware = upload.single("productAddImage")                       // HTML name

module.exports = multerMiddleware




/* 

< 준비 >
    
    1. 파일 저장을 하려면, from에 enctype = .. 를 정하면되는데, 그렇게되면 hidden value가 사라져, csrfToken을 제출할 수 없다.
    ==>  form의 aciton에 [쿼리 매개변수로 csrfToken을 제시한다.] ...? =_csrf=""

< multer의 역할>

    파일 저장할 위치, 파일 이름 등의 상세정보를 수정할 수 있게 한다.

<multer의 사용>
    
    upload라는 변수 안에

    [저장위치와, 저장될 파일이름이 들어가 있는, multer() ] 를 담아

    [multer에 있는  .single ]  혹은 그밖의 다른 함수를 사용해 [ 저장할 파일 탐색기 를 담아] [ 미들웨어로 ] 보낸다.

    그러면 [라우트는 그 페이지에 요청을 접수할때, 탐색기에 담겨있는 파일을 읽고, 저장할 수 있다].

    파일을 읽은 후에 [처리는 서버에서 코드로]

<결론>

    1. multer 안에는 [객체 형식의 stroage 가 담겨있으면 된다.]

    2. storage 안에는 multer.diskStorage() 가 들어가고

    3. diskStorage() 안에는 [객체 형식의 desination과, filename 이 들어간다.]

    4. 
    우리가 미들웨어로 넘겨야할 것은

    upload.single("name") 

    이라는 미들웨어이다.
        
*/
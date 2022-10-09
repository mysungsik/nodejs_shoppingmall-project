const express = require("express")
const path = require("path")
const csruf = require("csurf")

const session = require("express-session")
const MongoDbStrore = require("connect-mongodb-session")(session)

const sessionConfig = require("./middleware/connectSession")
const addCsrfToken = require("./middleware/csrfToken")
const errorHandler = require("./middleware/errorHandler")
const userAuth = require("./middleware/userAuth")
const authCheck = require("./middleware/userAuthCheck")
const totalQuantity = require("./middleware/totalQuantity")
const notFound = require("./middleware/not-found")

const authRoute = require("./routes/auth-route")
const clientProductRoute = require("./routes/client-products-route")
const productRoute = require("./routes/product-route")
const payToOrderRoute = require("./routes/pay-to-order-route")
const adminManageOrderRoute = require("./routes/admin-order-manage-route")

const db = require("./database/database")

const Sessionstore = new MongoDbStrore(sessionConfig.sessionStore())

const app = express()

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(express.static("public"))
app.use("/products/assets",express.static("src"))

app.use(session(sessionConfig.sessionBuild(Sessionstore)))
app.use(express.urlencoded({extended:false}))
app.use(express.json())     // ajax에서 보내는 json를 서버에서 받기 위한! 미들웨어! 



app.use(csruf())
app.use(addCsrfToken)

app.use(userAuth)
app.use(totalQuantity)


app.use(authRoute)
app.use(clientProductRoute)
app.use(authCheck)
app.use(productRoute)   // 앞에 [/admin] 필터를 붙여준다면, routes 폴더에서는 /admin/... 가 아니라 바로 /... 이 나올 수 있게 되겠지
app.use(payToOrderRoute)
app.use(adminManageOrderRoute)

// 잘못된 URL 요청에 관해, 처리되는 미들웨어 [next가 없어서 더이상 앞으로 나가지 않음]
app.use(notFound)

// 잡히지 않은 모든 에러에 관하여, 처리하는 미들웨어
app.use(errorHandler)


db.connectToDatabse().then(function(){
    
    let port = process.env.PORT;

    if (port == null || port == "") {
    port = 3000;
    }
    
    app.listen(port)
}).catch(function(error){
    console.log(error)
})



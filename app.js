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

const authRoute = require("./routes/auth-route")
const clientProductRoute = require("./routes/client-products-route")
const productRoute = require("./routes/product-route")

const db = require("./database/database")

const Sessionstore = new MongoDbStrore(sessionConfig.sessionStore())

const app = express()

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(express.static("public"))
app.use("/products/assets",express.static("src"))

app.use(session(sessionConfig.sessionBuild(Sessionstore)))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(csruf())
app.use(addCsrfToken)

app.use(userAuth)


app.use(clientProductRoute)
app.use(authRoute)
app.use(authCheck)
app.use(productRoute)   // 앞에 [/admin] 필터를 붙여준다면, routes 폴더에서는 /admin/... 가 아니라 바로 /... 이 나올 수 있게 되겠지



app.use(errorHandler)

db.connectToDatabse().then(function(){
    app.listen(3000)
}).catch(function(error){
    console.log(error)
})



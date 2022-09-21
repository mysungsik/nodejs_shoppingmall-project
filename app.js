const express = require("express")
const path = require("path")
const csruf = require("csurf")

const session = require("express-session")
const MongoDbStrore = require("connect-mongodb-session")(session)

const sessionConfig = require("./middleware/connectSession")
const addCsrfToken = require("./middleware/csrfToken")
const errorHandler = require("./middleware/errorHandler")
const userAuth = require("./middleware/userAuth")

const authRoute = require("./routes/auth-route")
const productRoute = require("./routes/product-route")

const db = require("./database/database")

const Sessionstore = new MongoDbStrore(sessionConfig.sessionStore())

const app = express()

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.use(session(sessionConfig.sessionBuild(Sessionstore)))

app.use(csruf())
app.use(addCsrfToken)

app.use(userAuth)

app.use(authRoute)
app.use(productRoute)

app.use(errorHandler)

db.connectToDatabse().then(function(){
    app.listen(3000)
}).catch(function(error){
    console.log(error)
})



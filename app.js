const express = require("express")
const path = require("path")

const authRoute = require("./routes/auth-route")
const db = require("./database/database")

const app = express()

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))


app.use(authRoute)


db.connectToDatabse().then(function(){
    app.listen(3000)
}).catch(function(error){
    console.log(error)
})



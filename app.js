const express = require("express")
const path = require("path")

const clientRoute = require("./routes/client")
const db = require("./database/database")

const app = express()

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(clientRoute)

db.connectToDatabse().then(function(){
    app.listen(3000)
})

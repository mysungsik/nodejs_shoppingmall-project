const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;

let database;


let mongodbUrl = process.env.MONGODB_URI;

if (mongodbUrl == null || mongodbUrl == "") {
    mongodbUrl = "mongodb+srv://audtlr:MS6zcXpZ1RfqQSDo@cluster0.mzdaqy1.mongodb.net/?retryWrites=true&w=majority";
}

async function connectToDatabse(){
    
    const client = await MongoClient.connect(mongodbUrl)
    database = client.db("shopping-project")
}

function getDb(){
    if(!database){
        throw{message: "you must connect first!"}
    }
    return database
}


module.exports = {
    connectToDatabse:connectToDatabse,
    getDb:getDb
}

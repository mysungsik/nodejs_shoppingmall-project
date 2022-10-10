const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;

let database;


let mongodbUrl = process.env.MONGODB_URI;
if (mongodbUrl == null || mongodbUrl == "") {
    mongodbUrl = "mongodb://127.0.0.1:27017";
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

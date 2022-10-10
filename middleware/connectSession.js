function sessionStore(){
    return {
        uri : "mongodb+srv://audtlr:MS6zcXpZ1RfqQSDo@cluster0.mzdaqy1.mongodb.net/?retryWrites=true&w=majority",
        databaseName:"shopping-project",
        collection : "session"
    }
}

function sessionBuild(store){
    return{
        secret:"super secret",
        resave:false,
        saveUninitialized:false,
        store:store,
        cookie:{
            maxAge : 1000* 60* 60*60
        }
    }
}

module.exports = {
    sessionBuild:sessionBuild,
    sessionStore:sessionStore
}
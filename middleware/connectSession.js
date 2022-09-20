function sessionStore(){
    return {
        uri : "mongodb://127.0.0.1:27017",
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
            maxAge : 1000* 60* 60
        }
    }
}

module.exports = {
    sessionBuild:sessionBuild,
    sessionStore:sessionStore
}
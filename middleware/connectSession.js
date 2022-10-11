let sessionStoreURI = process.env.MONGODB_URI

if(sessionStoreURI==null || sessionStoreURI==""){
    sessionStoreURI ="mongodb://127.0.0.1:27017"
}

function sessionStore(){
    return {
        uri : sessionStoreURI,
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
const mongoclient = require('mongodb').MongoClient;

const uri = "mongodb+srv://user_tp2:tp123456@cluster0.iqa99.mongodb.net/test?retryWrites=true&w=majority";

const client = new mongoclient(uri);

let instance = null;

async function getConnection(){
    let instance = await client.connect();
    return instance;
}

module.exports = {getConnection};
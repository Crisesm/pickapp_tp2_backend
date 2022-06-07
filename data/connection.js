require('dotenv').config();

const mongoclient = require('mongodb').MongoClient;

const uri = process.env.MONGO_DB;

const client = new mongoclient(uri);

let instance = null;

async function getConnection(){
    if(instance == null){
        try{
            instance = await client.connect();
        } catch (error){
            console.log(error.message);
            throw new Error('Error en la conexion con MongoDB');
        }
    }
    return instance;
}

module.exports = {getConnection};

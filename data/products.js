const connection = require('./connection');
const objectId = require('mongodb').ObjectId;

async function getProducts(){
    const clientmongodb = await connection.getConnection();
    const result = await clientmongodb
            .db('test')
            .collection('products')
            .find()
            .toArray
    return result;
}

module.exports = {getProducts}
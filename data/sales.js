const connection = require('./connection');
const objectId = require('mongodb').ObjectId;
require('dotenv').config();

async function getSales(){
    const clientmongo = await connection.getConnection();
    const sales = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_SALES)
                .find()
                .toArray();
    return sales;
}

async function getSaleById(id){
    const clientmongo = await connection.getConnection();
    const sale = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_SALES)
                .find({_id: new objectId(id)})
                .toArray();
    return sale;
}

async function getSaleByIdUser(id){
    const clientmongo = await connection.getConnection();
    const sale = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_SALES)
                .find({idUser: new objectId(id)})
                .toArray();
    return sale;
}

async function addSale(sale){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_SALES)
                .insertOne(sale);
    return result;
}

module.exports= {getSales, getSaleById, getSaleByIdUser, addSale};
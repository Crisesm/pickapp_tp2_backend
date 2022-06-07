const connection = require('./connection');
const objectId = require('mongodb').ObjectId;
require('dotenv').config();

async function getProducts(){
    const clientmongo = await connection.getConnection();
    const products = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .find({"stock": {$gt: 0}})
                .toArray();
    console.log("cantidad: ", products.length);
    return products;
}

async function getProductById(id){
    const clientmongo = await connection.getConnection();
    const product = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .find({_id: new objectId(id)})
                .toArray();
    return product;
}

async function getProductsByCategory(category){
    const clientmongo = await connection.getConnection();
    const products = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .find( { $and:[ {"categoria": category}, {"stock": {$gte: 1}}]})
                .toArray();
    console.log("cantidad: ", products.length);
    return products;
}

async function addProduct(product){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .insertOne(product);
    return result;
}

async function updateStock(id, newStock){
    console.log(newStock);
    const clientmongo = await connection.getConnection();
    const result = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .updateOne(
                    { _id: objectId(id)},
                    { $set: {"stock": newStock} },
                );
    return result;
}

async function updatePrice(id, newPrice){
    console.log(newPrice);
    const clientmongo = await connection.getConnection();
    const result = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .updateOne(
                    { _id: objectId(id)},
                    { $set: {"precio": newPrice} },
                );
    return result;
}

async function subtractStock(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .update(
                    { _id: objectId(id)},
                    { $inc: { stock: -1 } },
                );
    return result;
}

async function deleteProduct(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo
                .db(process.env.DATABASE)
                .collection(process.env.TABLE_PRODUCTS)
                .deleteOne(id);
    return result;
}

module.exports= {getProducts, getProductsByCategory, getProductById, addProduct, 
                deleteProduct, updateStock, updatePrice, subtractStock};

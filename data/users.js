const mongodb = require('mongodb');
const connection = require('./connection');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getAllUsers(){
    const connectdb = await connection.getConnection();
    const users = await connectdb
                        .db(process.env.DATABASE)
                        .collection(process.env.TABLE_USERS)
                        .find()
                        .toArray();
    return users;
}

async function getUser(id){
    const connectdb = await connection.getConnection();
    const user = await connectdb
                        .db(process.env.DATABASE)
                        .collection(process.env.TABLE_USERS)
                        .findOne({_id: new objectId(id)});
    return user;
}

async function addUser(user){
    const connectdb = await connection.getConnection();

    user.password = await bcrypt.hash(user.password, 8);

    const result = await connectdb
                        .db(process.env.DATABASE)
                        .collection(process.env.TABLE_USERS)
                        .insertOne(user);
    return result;
}

async function findByCredentials(email, password){
    const connectdb = await connection.getConnection();

    const user = await connectdb
                            .db(process.env.DATABASE)
                            .collection(process.env.TABLE_USERS)
                            .findOne({email: email});

    if(!user){
        throw new Error('Credenciales no válidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Credenciales no válidas');
    }

    return user;
}

async function generateToken(user){
    const token = jwt.sign({_id: user._id}, process.env.KEY_SECRET, {expiresIn: '24h'});
    console.log(token);
    return token;
}

async function findByEmail(email){
    const connectdb = await connection.getConnection();

    const user = await connectdb
                            .db(process.env.DATABASE)
                            .collection(process.env.TABLE_USERS)
                            .findOne({email: email});
    return user;
}

module.exports = {addUser, getAllUsers, findByCredentials, generateToken, getUser, findByEmail}

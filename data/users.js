const mongodb = require('mongodb');
const connection = require('./connection');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getAllUsers(){
    const connectdb = await connection.getConnection();
    const users = await connectdb
                        .db('test')
                        .collection('users')
                        .find()
                        .toArray();
    return users;
}

async function getUser(id){
    const connectdb = await connection.getConnection();
    const user = await connectdb
                        .db('test')
                        .collection('users')
                        .find({_id: new objectId(id)})
                        .toArray();
    return user;
}

async function addUser(user){
    const connectdb = await connection.getConnection();

    user.password = await bcrypt.hash(user.password, 8);

    const result = await connectdb
                        .db('test')
                        .collection('users')
                        .insertOne(user);
    return result;
}

async function findByCredentials(email, password){
    //encuentre el usuario en la DB y validar el acceso
    const connectdb = await connection.getConnection();
    //valida que el usuario exista
    const user = await connectdb
                            .db('test')
                            .collection('users')
                            .findOne({email: email});
    //Validacion del nombre de usuario
    if(!user){
        throw new Error('Credenciales ingresadas no son válidas');
    }
    //Validacion de la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Credenciales ingresadas no son válidas');
    }
    return user;
}

//'proyectopickapp' va en una variable de entorno
async function generateToken(user){
    const token = jwt.sign({_id: user._id}, 'proyectopickapp', {expiresIn: '2h'});
    console.log(token);
    return token;
}

async function deleteUser(id){
    const connectdb = await connection.getConnection();
    const result = await connectdb
                        .db('test')
                        .collection('users')
                        .deleteOne(id);
    return result;
}

module.exports = {addUser, getAllUsers, getUser, findByCredentials, generateToken, deleteUser}

var express = require('express');
var router = express.Router();
const data = require('./../data/users');

//GET /api/users/
router.get('/',  async function(req, res, next) {
  const users = await data.getAllUsers();
  res.json(users);
});

//POST /api/users/register
router.post('/register', async (req, res) =>{
  try {
    const userExist = await data.findByEmail(req.body.email);
    if(!userExist){
      const result = await data.addUser(req.body);
      const user = await data.getUser(result.insertedId);
      const token = await data.generateToken(user);
      res.send({"user": {"email": user.email, "_id": user._id}, token, status: 0});
    }
    else{
      res.send({mensaje: 'El usuario ya existe', status: -1});
    }
  } catch (error) {
    res.status(401).send('No se puedo crear el usuario, error: ' + error.message);
  }
});

//POST /api/users/login
router.post('/login',async (req, res)=>{
  try {
    const user = await data.findByCredentials(req.body.email, req.body.password);
    const token = await data.generateToken(user);
    res.send({"user": {"email": user.email, "_id": user._id}, token, status: 0});
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
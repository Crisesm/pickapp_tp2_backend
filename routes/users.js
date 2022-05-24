var express = require('express');
var router = express.Router();
const data = require('./../data/users');
const objectId = require('mongodb').ObjectId;

router.get('/', async function(req, res, next) {
  const users = await data.getAllUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await data.getUser(req.params.id);
  res.json(user);
});

//alta de un usuario
router.post('/', async (req,res) => {
  const result = await data.addUser(req.body);
  res.json(result);
})

//hacer login
router.post('/login', async (req,res) => {
  try {
    const user = await data.findByCredentials(req.body.email, req.body.password);
    const token = await data.generateToken(user);
    res.send({user, token});
  } catch (error) {
    res.status(401).send(error.message);
  }
})

// Falta la autorizacion!


//delete user
router.delete('/:id', async (req, res) => {
  const query = {"_id" : objectId(req.params.id)};
  const result = await data.deleteUser(query);
  res.json(result);
})

module.exports = router;

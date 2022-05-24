const { json } = require('express');
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('./../data/products');

router.get('/', async (req,res) =>{
    const products = await data.getProducts();
    res.json(products);
})
  
// router.get('/:id', async (req, res) => {

// })
  
// router.post('/', async (req, res) => {

// });
  
// router.put('/:id', async (req, res) => {

// })
  
// router.delete('/:id', async (req, res) => {

// })

module.exports = router;
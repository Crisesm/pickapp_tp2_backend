const { json } = require('express');
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data/products')

//GET: /api/products/
router.get('/', async function(req, res, next) {
  const products = await data.getProducts();
  res.json(products);
});

//GET: /api/products/:id
router.get('/:id', async (req, res) => {
  const product = await data.getProductById(req.params.id);
  res.json(product);
})

//GET: /api/products/Category/:category
router.get('/category/:category', async (req, res) => {
  const product = await data.getProductsByCategory(req.params.category);
  res.json(product);
})

//POST: /api/products
router.post('/', async (req, res) => {
    const result = await data.addProduct(req.body);
    res.json(result);
});

//PUT  /api/products/newStock/?id=[id]&newStock=newStock
router.put('/newStock/', async (req, res) => {
  const id = req.query.id;
  const newStock = parseInt(req.query.newStock);
  const result = await data.updateStock(id, newStock);
  res.json(result);
})

//PUT  /api/products/newPrice/?id=[id]&newPrice=[newPrice]
router.put('/newPrice/', async (req, res) => {
  const id = req.query.id;
  const newPrice = parseInt(req.query.newPrice);
  const result = await data.updatePrice(id, newPrice);
  res.json(result);
})

//PUT  /api/products/:id
router.put('/:id', async (req, res) => {
  const result = await data.subtractStock(req.params.id);
  res.json(result);
})

//DELETE  /api/products/:id
router.delete('/:id', async (req, res) => {
  const query = {"_id" : ObjectId(req.params.id)};
  const result = await data.deleteProduct(query);
  res.json(result);
})

module.exports = router;
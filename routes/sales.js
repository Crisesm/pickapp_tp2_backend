const { json } = require('express');
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data/sales');
const auth = require('../middlewares/auth');

//GET: /api/sales/
router.get('/', async function(req, res, next) {
    const sales = await data.getSales();
    res.json(sales);
  });
  
//GET: /api/sales/:id
router.get('/:id', async (req, res) => {
    const sale = await data.getSaleById(req.params.id);
    res.json(sale);
})

//GET: /api/sales/user/:id
//Agregar 
router.get('/user/:id', async (req, res) => {
    const sale = await data.getSaleByIdUser(req.params.id);
    res.json(sale);
})

//POST: /api/sales
router.post('/', async (req, res) => {
    const result = await data.addSale(req.body);
    res.json(result);
});

module.exports = router;
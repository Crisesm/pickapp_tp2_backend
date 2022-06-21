const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next){
    const token = req.header('Authorization');
    try {
        const user = jwt.verify(token, process.env.KEY_SECRET);
        next();
    } catch (error) {
        res.status(401).send({error: error.message});
    }
    next();
}

module.exports = auth;
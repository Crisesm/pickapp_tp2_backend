const jwt = require('jsonwebtoken');
require('dotenv').config();

let jwtConfig = {
    // middleware to validate token (rutas protegidas)
    verifyToken(req, res, next) {
        const token = req.header('Authorization')
        if (!token) return res.status(401).json({error: true, status: -3, menssage: "Acceso Denegado" })
        try {
            const verified = jwt.verify(token, process.env.KEY_SECRET)
            req.tokenRecibido = verified
            next()
        } catch (error) {
            res.status(400).json({ error: 'token no es válido' })
        }
    },

 
}
module.exports = {jwtConfig};


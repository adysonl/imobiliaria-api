const jwt = require('jsonwebtoken');
const config = require('../config')
module.export = (req, res, next) =>{
    //const authHeader = req.headers.authorization;
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({error: 'Token invalido'});
        }
        req.userId = decoded.id;
        return next();
    });

}


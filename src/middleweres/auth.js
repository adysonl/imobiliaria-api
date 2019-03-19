const jwt = require('jsonwebtoken');
const config = require('../config');
const verify = (req, res, next) =>{
    //console.log(req.headers);
    const token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            res.json({message: 'falha na autenticacao'});
        }else{
            console.log(decoded);
            next();
        }
        });
    }else{
        res.json({message: 'necessaria autenticacao'});
    }
}

module.exports = {
    verify: verify
}


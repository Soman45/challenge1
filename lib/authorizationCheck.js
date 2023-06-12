const JWT = require('jsonwebtoken');

function authoriztionCheck(req, res, next){
    const token = req.cookies.token;
    if(token){
      try{
        const validToken = JWT.verify(token, process.env.JWT_SECRET)
      console.log('token', validToken);
      next();
      }catch(error){
        res.status(401).send('Silahkan Login Terlebih Dahulu')
      }
    }else{
        res.status(401).send('Silahkan Login Terlebih Dahulu')
    }
}

module.exports = {authoriztionCheck}
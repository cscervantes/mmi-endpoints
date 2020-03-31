let jwt = require('jsonwebtoken')
const createError = require('http-errors');
module.exports = (req, res, next) => {
    const bearer = req.headers["authorization"]

    if(typeof bearer !== 'undefined'){
        const bearerToken = bearer.split(" ")[1]
        jwt.verify(bearerToken, 'mmi-endpoints-secret', (err, result)=>{
            if(err){
                next(createError(403))
            }else{
                next()
            }
        })

    }else{
        // res.sendStatus(401)
        next(createError(401))
    }
}
const createError = require('http-errors');

const web = {}

web.HOME = async ( req, res, next ) => {
    try{
        res.status(200).send('Crawler endpoints')
    }catch(error){
        next(createError(error))
    }
}

module.exports = web
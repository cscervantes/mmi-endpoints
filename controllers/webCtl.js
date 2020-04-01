const createError = require('http-errors');
const { websites } = require('../blueprints')
const web = {}

web.HOME = async ( req, res, next ) => {
    try{
        res.status(200).send('Web endpoints.')
    }catch(error){
        next(createError(error))
    }
}

web.FIND_BY_ID = async (req, res, next) => {
    try {
        const result = await websites.viewWebsite(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.STORE = async (req, res, next) => {
    try {
        const result = await websites.storeWebsite(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.UPDATE = async (req, res, next) => {
    try {
        const result = await websites.updateWebsite(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.DELETE = async (req, res, next) => {
    try {
        const result = await websites.deleteWebsite(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.LIST = async (req, res, next) => {
    try {
        const result = await websites.listWebsite(req)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}
module.exports = web
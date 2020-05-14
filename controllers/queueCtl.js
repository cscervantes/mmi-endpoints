const createError = require('http-errors');
const { queues } = require('../blueprints')
const queue = {}

queue.HOME = async ( req, res, next ) => {
    try{
        res.status(200).send('Queue endpoints.')
    }catch(error){
        next(createError(error))
    }
}

queue.LIST = async (req, res, next) => {
    try {
        const result = await queues.find(req.query || {}).limit(parseInt(req.query.limit) || 25)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

queue.STORE = async (req, res, next) => {
    try {
        const result = await queues.storeQueue(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

queue.DELETE = async (req, res, next) => {
    try {
        const result = await queues.deleteQueue(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = queue
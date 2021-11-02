const createError = require('http-errors');
const { mappers } = require('../blueprints')
const mapper = {}

mapper.ID = async (req, res, next) => {
    try {
        const result = await mappers.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

mapper.CREATE = async (req, res, next) => {
    try {
        const result = await mappers.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

mapper.UPDATE = async (req, res, next) => {
    try {
        const result = await mappers.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

mapper.DELETE = async (req, res, next) => {
    try {
        const result = await mappers.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

mapper.CUSTOM_QUERY = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10
        let offset = req.query.offset || 0
        let fields = {}
        if(req.query.fields){
            fields = JSON.parse(req.query.fields)
        }
        let sort = req.query.sort || 'date_created'
        let sortBy = req.query.sortBy || -1
        let sorting = {}
        sorting[sort] = parseInt(sortBy)
        // console.log(sorting)
        let filter = req.body || {}
        const result = await mappers.find(filter, fields).limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

mapper.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await mappers.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = mapper
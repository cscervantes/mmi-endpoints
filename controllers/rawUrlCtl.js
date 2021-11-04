const createError = require('http-errors');
const { raw_urls } = require('../blueprints')
const raw_url = {}

raw_url.ID = async (req, res, next) => {
    try {
        const result = await raw_urls.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw_url.CREATE = async (req, res, next) => {
    try {
        const result = await raw_urls.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw_url.UPDATE = async (req, res, next) => {
    try {
        const result = await raw_urls.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw_url.DELETE = async (req, res, next) => {
    try {
        const result = await raw_urls.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw_url.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await raw_urls.find(filter, fields).populate('website').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw_url.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await raw_urls.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = raw_url
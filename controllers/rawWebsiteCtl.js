const createError = require('http-errors');
const { raw_websites } = require('../blueprints');
const raw = {}

raw.READ = async (req, res, next) => {
    try {
        const size = parseInt(req.query.limit) || 10
        const skip = parseInt(req.query.offset) || 0
        const sortBy = {"date_created":-1}
        const fields = {}
        if(req.query.hasOwnProperty('fields')){
            fields = JSON.parse(req.query.fields)
        }
        if(req.query.hasOwnProperty('sort')){
            sortBy = JSON.parse(req.query.sort)
        }
        delete req.query.offset
        delete req.query.limit
        delete req.query.sort
        const query = req.query
        const result = await raw_websites.find(query, fields).sort(sortBy).skip(skip).limit(size)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.VIEW_BY_ID = async (req, res, next) => {
    try {
        const result = await raw_websites.findOne({"_id":req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.CREATE = async (req, res, next) => {
    try {
        const result = await raw_websites.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.UPDATE = async (req, res, next) => {
    try {
        const result = await raw_websites.findOneAndUpdate({"_id": req.params.id}, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.DELETE = async (req, res, next) => {
    try {
        const result = await raw_websites.deleteOne({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.COUNT = async (req, res, next) => {
    try {
        const result = await raw_websites.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = raw
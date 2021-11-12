const createError = require('http-errors');
const { redis_articles } = require('../blueprints')
const redisArticle = {}

redisArticle.ID = async (req, res, next) => {
    try {
        const result = await redis_articles.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

redisArticle.CREATE = async (req, res, next) => {
    try {
        const result = await redis_articles.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

redisArticle.UPDATE = async (req, res, next) => {
    try {
        const result = await redis_articles.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

redisArticle.DELETE = async (req, res, next) => {
    try {
        const result = await redis_articles.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

redisArticle.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await redis_articles.find(filter, fields).limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

redisArticle.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await redis_articles.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = redisArticle
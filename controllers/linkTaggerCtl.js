const createError = require('http-errors');
const { link_taggers } = require('../blueprints')
const linkTagger = {}

linkTagger.ID = async (req, res, next) => {
    try {
        const result = await link_taggers.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkTagger.CREATE = async (req, res, next) => {
    try {
        const result = await link_taggers.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkTagger.UPDATE = async (req, res, next) => {
    try {
        const result = await link_taggers.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkTagger.DELETE = async (req, res, next) => {
    try {
        const result = await link_taggers.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkTagger.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await link_taggers.find(filter, fields).limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkTagger.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await link_taggers.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = linkTagger
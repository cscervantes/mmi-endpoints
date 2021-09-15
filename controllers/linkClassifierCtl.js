const createError = require('http-errors');
const { link_classifiers } = require('../blueprints')
const linkClassifier = {}

linkClassifier.ID = async (req, res, next) => {
    try {
        const result = await link_classifiers.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkClassifier.CREATE = async (req, res, next) => {
    try {
        const result = await link_classifiers.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkClassifier.UPDATE = async (req, res, next) => {
    try {
        const result = await link_classifiers.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkClassifier.DELETE = async (req, res, next) => {
    try {
        const result = await link_classifiers.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkClassifier.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await link_classifiers.find(filter, fields).limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

linkClassifier.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await link_classifiers.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = linkClassifier
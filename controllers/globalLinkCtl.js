const createError = require('http-errors');
const { global_links } = require('../blueprints')
const globalLink = {}

globalLink.ID = async (req, res, next) => {
    try {
        const result = await global_links.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

globalLink.CREATE = async (req, res, next) => {
    try {
        const result = await global_links.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

globalLink.UPDATE = async (req, res, next) => {
    try {
        const result = await global_links.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

globalLink.DELETE = async (req, res, next) => {
    try {
        const result = await global_links.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

globalLink.CUSTOM_QUERY = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10
        let offset = req.query.offset || 0
        let fields = {}
        if(req.query.fields){
            JSON.parse(req.query.fields)
        }
        let sort = req.query.sort || 'date_created'
        let sortBy = req.query.sortBy || -1
        let sorting = {}
        sorting[sort] = parseInt(sortBy)
        // console.log(sorting)
        let filter = req.body || {}
        const result = await global_links.find(filter, fields).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

globalLink.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await global_links.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = globalLink
const createError = require('http-errors');
const { links } = require('../blueprints')
const link = {}

link.ID = async (req, res, next) => {
    try {
        const result = await links.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

link.CREATE = async (req, res, next) => {
    try {
        const result = await links.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

link.UPDATE = async (req, res, next) => {
    try {
        const result = await links.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

link.DELETE = async (req, res, next) => {
    try {
        const result = await links.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

link.CUSTOM_QUERY = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10
        let offset = req.query.offset || 0
        let fields = req.query.fields || {}
        let sort = req.query.sort || 'date_created'
        let sortBy = req.query.sortBy || -1
        let sorting = {}
        sorting[sort] = parseInt(sortBy)
        // console.log(sorting)
        let filter = req.body || {}
        const result = await links.find(filter, fields).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = link
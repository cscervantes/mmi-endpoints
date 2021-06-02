const createError = require('http-errors');
const { section_logs } = require('../blueprints')
const sectionLogs = {}

sectionLogs.ID = async (req, res, next) => {
    try {
        const result = await section_logs.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLogs.CREATE = async (req, res, next) => {
    try {
        const result = await section_logs.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLogs.UPDATE = async (req, res, next) => {
    try {
        const result = await section_logs.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLogs.DELETE = async (req, res, next) => {
    try {
        const result = await section_logs.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLogs.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await section_logs.find(filter, fields).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLogs.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await section_logs.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = sectionLogs
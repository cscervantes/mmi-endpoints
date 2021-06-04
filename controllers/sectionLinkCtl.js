const createError = require('http-errors');
const { section_links } = require('../blueprints')
const sectionLinks = {}

sectionLinks.ID = async (req, res, next) => {
    try {
        const result = await section_links.findById({'_id': req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLinks.CREATE = async (req, res, next) => {
    try {
        const result = await section_links.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLinks.UPDATE = async (req, res, next) => {
    try {
        const result = await section_links.findOneAndUpdate({"_id": req.params.id }, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLinks.DELETE = async (req, res, next) => {
    try {
        const result = await section_links.findOneAndRemove({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLinks.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await section_links.find(filter, fields).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

sectionLinks.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await section_links.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = sectionLinks
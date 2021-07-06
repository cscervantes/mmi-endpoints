const createError = require('http-errors');
const { sections, websites } = require('../blueprints')
const section = {}

section.HOME = async ( req, res, next ) => {
    try{
        res.status(200).send('Web endpoints.')
    }catch(error){
        next(createError(error))
    }
}

section.FIND_BY_ID = async (req, res, next) => {
    try {
        const result = await sections.viewSection(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

section.STORE = async (req, res, next) => {
    try {
        const result = await sections.storeSection(req.body)
        await websites.findByIdAndUpdate(result.website, 
            { $push :{ embedded_sections: result._id},
                updated_by: req.body.updated_by,
                date_updated: req.body.date_updated
            },
            { new: true, useFindAndModify: false}
        )
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

section.UPDATE = async (req, res, next) => {
    try {
        const result = await sections.updateSection(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

section.DELETE = async (req, res, next) => {
    try {
        const result = await sections.deleteSection(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

section.LIST = async (req, res, next) => {
    try {
        const result = await sections.listSection(req)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

section.CUSTOM_QUERY = async (req, res, next) => {
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
        const result = await sections.find(filter, fields).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

section.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await sections.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = section
const createError = require('http-errors');
const { sections } = require('../blueprints')
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
module.exports = section
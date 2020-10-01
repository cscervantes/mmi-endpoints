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

module.exports = link
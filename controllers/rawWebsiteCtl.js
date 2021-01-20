const createError = require('http-errors');
const { raw_websites } = require('../blueprints');
const raw = {}

raw.READ = async (req, res, next) => {
    try {
        const size = parseInt(req.query.limit) || 10
        const skip = parseInt(req.query.offset) || 0
        let sortBy = {"date_created":-1}
        let fields = {}
        if(req.query.hasOwnProperty('fields')){
            fields = JSON.parse(req.query.fields)
        }
        if(req.query.hasOwnProperty('sort')){
            sortBy = JSON.parse(req.query.sort)
        }
        delete req.query.offset
        delete req.query.limit
        delete req.query.sort
        delete req.query.fields

        const query = req.query
        const result = await raw_websites.find(query, fields).sort(sortBy).skip(skip).limit(size)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.QUERY = async (req, res, next) => {
    try {
        const size = parseInt(req.query.limit) || 10
        const skip = parseInt(req.query.offset) || 0
        let sortBy = {"date_created":-1}
        if(req.query.hasOwnProperty('sort')){
            sortBy = JSON.parse(req.query.sort)
        }
        const result = await raw_websites.find(req.body.query, req.body.fields).sort(sortBy).skip(skip).limit(size)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.VIEW_BY_ID = async (req, res, next) => {
    try {
        const result = await raw_websites.findOne({"_id":req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.CREATE = async (req, res, next) => {
    try {
        const result = await raw_websites.create(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.UPDATE = async (req, res, next) => {
    try {
        const result = await raw_websites.findOneAndUpdate({"_id": req.params.id}, req.body, {upsert:false})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.DELETE = async (req, res, next) => {
    try {
        const result = await raw_websites.deleteOne({"_id": req.params.id})
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.COUNT = async (req, res, next) => {
    try {
        const result = await raw_websites.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

raw.DATATABLES = async (req, res, next) => {
    try {
        let sortCol = req.body['order[0][column]']
        let sortDir = req.body['order[0][dir]']
        
        let sort = {}
        let fields = ['name', 'fqdn', 'country', 'verified', 'alexa_rankings.global', 'alexa_rankings.local', 'date_created']

        if(sortDir === 'desc'){
            sort[fields[sortCol]] = -1
        }else{
            sort[fields[sortCol]] = 1
        }

        let totalDoc = await raw_websites.countDocuments()

        raw_websites.dataTables({
            limit: req.body.length || 10,
            skip: req.body.start || 0,
            search: {
                value: req.body["search[value]"] || null,
                fields: fields.splice(0,5)
            },
            sort: sort
        }).then(function(table){
            table['recordsTotal'] = totalDoc
            table['recordsFiltered'] = table.total
            res.status(200).send(table)
        }).catch(function(error){
            next(createError(error))
        })
    } catch (error) {
        next(createError(error))
    }
}

module.exports = raw
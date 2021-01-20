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

        let fields = ['name', 'fqdn', 'country', 'alexa_rankings.global', 'alexa_rankings.local']

        if(sortDir === 'desc'){

            sort[fields[sortCol]] = -1

        }else{

            sort[fields[sortCol]] = 1

        }

        let query = {}

        table = {}

        let totalDoc = await raw_websites.countDocuments()

        table.recordsTotal = totalDoc

        if(req.body.hasOwnProperty('fqdn')){

            query.fqdn = { "$regex": req.body.fqdn }

        }

        if(req.body.hasOwnProperty('global')){

            let k = req.body.global.split(':')[1]

            let v = parseInt(req.body.global.split(':')[0])

            let kv = {}

            kv[k] = v
            
            query["alexa_rankings.global"] = kv

        }
        
        if(req.body.hasOwnProperty('local')){

            let k = req.body.local.split(':')[1]

            let v = parseInt(req.body.local.split(':')[0])

            let kv = {}

            kv[k] = v

            query["alexa_rankings.local"] = kv

        }

        if(req.body.hasOwnProperty('name')){

            query.name = {"$regex": new RegExp(req.body.name, "i")}

        }

        if(req.body.hasOwnProperty('country')){

            query.country = {"$regex": new RegExp(req.body.country, "i")}
            
        }
        
        let recordsFiltered = await raw_websites.countDocuments(query)
               

        table.recordsFiltered = recordsFiltered
        
        table.total = recordsFiltered
        
        const result = await raw_websites.find(query).sort(sort).skip(parseInt(req.body.start)).limit(parseInt(req.body.length))

        table.data = result

        res.status(200).send(table)

    } catch (error) {

        next(createError(error))

    }
}

module.exports = raw
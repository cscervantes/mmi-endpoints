const createError = require('http-errors');
const { websites } = require('../blueprints')
const moment = require('moment')
const web = {}

web.HOME = async ( req, res, next ) => {
    try{
        res.status(200).send('Web endpoints.')
    }catch(error){
        next(createError(error))
    }
}

web.FIND_BY_ID = async (req, res, next) => {
    try {
        const result = await websites.viewWebsite(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.STORE = async (req, res, next) => {
    try {
        const result = await websites.storeWebsite(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.UPDATE = async (req, res, next) => {
    try {
        const result = await websites.updateWebsite(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.DELETE = async (req, res, next) => {
    try {
        const result = await websites.deleteWebsite(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.LIST = async (req, res, next) => {
    try {
        const result = await websites.listWebsite(req)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.DATATABLES = async (req, res, next) => {
    try {
        // console.log(req.body)
        // let sortCol = req.body.order[0]['column']
        let sortCol = req.body['order[0][column]']
        // let sortDir = req.body.order[0]['dir']
        let sortDir = req.body['order[0][dir]']
        
        let sort = {}
        let fields = ['website_name', 'fqdn', 'website_category', 'website_type', 'country', 'status', 'date_created']

        if(sortDir === 'desc'){
            sort[fields[sortCol]] = -1
        }else{
            sort[fields[sortCol]] = 1
        }

        let totalDoc = await websites.countDocuments()

        websites.dataTables({
            limit: req.body.length || 10,
            skip: req.body.start || 0,
            search: {
                // value: req.body.search.value || null,
                value: req.body["search[value]"] || null,
                fields: fields.splice(0,5)
            },
            sort: sort
        }).then(function(table){
            table['recordsTotal'] = totalDoc
            table['recordsFiltered'] = table.total
            res.status(200).send(table)
        }).catch(function(error){
            // console.log(error)
            next(createError(error))
        })
    } catch (error) {
        // console.log(error)
        next(createError(error))
    }
}

web.WITH_NULL_FIELDS = async(req, res, next) => {
    try {
        let limit = req.query.limit || 10
        let offset = req.query.offset || 0
        let fields = {}
        if(req.query.fields){
            JSON.parse(req.query.fields)
        }
        let filter = req.body || {}
        let sort = req.query.sort || 'date_created'
        let sortBy = req.query.sortBy || -1
        let sorting = {}
        sorting[sort] = parseInt(sortBy)
        // delete filter.limit
        // delete filter.offset
        // delete filter.fields
        // console.log(filter)
        const result = await websites.find(filter, fields).limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.CUSTOM_QUERY = async(req, res, next) => {
    try {
        let limit = req.query.limit || 10
        let offset = req.query.offset || 0
        let fields = {}
        if(req.query.fields){
            fields = JSON.parse(req.query.fields)
        }
        let filter = req.body || {}
        let sort = req.query.sort || 'date_created'
        let sortBy = req.query.sortBy || -1
        let sorting = {}
        sorting[sort] = parseInt(sortBy)
        const result = await websites.find(filter, fields).limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

web.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await websites.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

web.DATATABLES_2 = async (req, res, next) => {
    try {

        // console.log(req.body)

        let sortCol = req.body['order[0][column]']

        let sortDir = req.body['order[0][dir]']
        
        let sort = {}

        let fields = ['website_name', 'fqdn', 'country', 'country_code', 'website_category', 'alexa_rankings.global', 'alexa_rankings.local', 'verified', 'date_created', 'status']

        if(sortDir === 'desc'){

            sort[fields[sortCol]] = -1

        }else{

            sort[fields[sortCol]] = 1

        }

        let query = {}

        table = {}

        let totalDoc = await websites.countDocuments()

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

        if(req.body.hasOwnProperty('website_name')){

            query.website_name = {"$regex": new RegExp(req.body.website_name, "i")}

        }

        if(req.body.hasOwnProperty('country')){

            query.country = {"$regex": new RegExp(req.body.country, "i")}
            
        }

        if(req.body.hasOwnProperty('country_code')){

            query.country_code = {"$regex": new RegExp(req.body.country_code, "i")}

        }

        if(req.body.hasOwnProperty('website_category')){

            query.website_category = {"$regex": new RegExp(req.body.website_category, "i")}

        }

        if(req.body.hasOwnProperty('verified')){

            query.verified = JSON.parse(req.body.verified)

        }

        if(req.body.hasOwnProperty('status')){

            query.status = req.body.status

        }

        if(req.body.hasOwnProperty('date_created')){

            query.date_created = {"$gte": moment(req.body.date_created).subtract(1, 'day').format('YYYY-MM-DD')+"T16:00:00.000Z", "$lte": req.body.date_created+"T16:00:00.000Z" }

        }

        // console.log(query)
        
        let recordsFiltered = await websites.countDocuments(query)
               

        table.recordsFiltered = recordsFiltered
        
        table.total = recordsFiltered
        
        const result = await websites.find(query).sort(sort).skip(parseInt(req.body.start)).limit(parseInt(req.body.length))

        table.data = result

        res.status(200).send(table)

    } catch (error) {

        next(createError(error))

    }
}

module.exports = web
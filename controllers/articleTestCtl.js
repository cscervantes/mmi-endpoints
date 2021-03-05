const createError = require('http-errors');
const { article_tests } = require('../blueprints')
const article = {}

article.HOME = async ( req, res, next ) => {
    try{
        res.status(200).send('Web endpoints.')
    }catch(error){
        next(createError(error))
    }
}

article.FIND_BY_ID = async (req, res, next) => {
    try {
        const result = await article_tests.viewArticle(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.COUNT_ARTICLE = async (req, res, next) => {
    try {
        let q = req.query
        const result = await article_tests.countDocuments({
            "article_url": q.article_url,
            "article_status": q.article_status
        })
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.COUNT_IF_EXIST = async (req, res, next) => {
    try {
        const result = await article_tests.countDocuments(req.body)
        res.status(200).send({'data': {...req.body, result} })
    } catch (error) {
        next(createError(error))
    }
}

article.STORE = async (req, res, next) => {
    try {
        const result = await article_tests.storeArticle(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.UPDATE = async (req, res, next) => {
    try {
        const result = await article_tests.updateArticle(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.DELETE = async (req, res, next) => {
    try {
        const result = await article_tests.deleteArticle(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.LIST = async (req, res, next) => {
    try {
        const result = await article_tests.listArticle(req)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.DATATABLES = async (req, res, next) => {
    try {
        // console.log(req.body)
        // let sortCol = req.body.order[0]['column']
        let sortCol = req.body['order[0][column]']
        // let sortDir = req.body.order[0]['dir']
        let sortDir = req.body['order[0][dir]']
        
        let sort = {}
        let fields = ['article_title', 'article_url', 'article_status']

        if(sortDir === 'desc'){
            sort[fields[sortCol]] = -1
        }else{
            sort[fields[sortCol]] = 1
        }

        let totalDoc = await article_tests.countDocuments()

        article_tests.dataTables({
            limit: req.body.length || 10,
            skip: req.body.start || 0,
            search: {
                // value: req.body.search.value || null,
                value: req.body["search[value]"] || null,
                fields: fields.splice(0,2)
            },
            sort: sort
        }).then(function(table){
            table['recordsTotal'] = totalDoc
            table['recordsFiltered'] = table.total
            res.status(200).send(table)
        }).catch(function(error){
            console.log(error)
            next(createError(error))
        })
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

article.CUSTOM_QUERY = async(req, res, next) => {
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
        const result = await article_tests.find(filter, fields).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit)).skip(parseInt(offset)).sort(sorting)
        res.status(200).send({'data': result})
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

article.COUNT_CUSTOM_QUERY = async (req, res, next) => {
    try {
        const result = await article_tests.countDocuments(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}
module.exports = article
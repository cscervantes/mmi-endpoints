const createError = require('http-errors');
const { articles } = require('../blueprints')
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
        const result = await articles.viewArticle(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.STORE = async (req, res, next) => {
    try {
        const result = await articles.storeArticle(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.UPDATE = async (req, res, next) => {
    try {
        const result = await articles.updateArticle(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.DELETE = async (req, res, next) => {
    try {
        const result = await articles.deleteArticle(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

article.LIST = async (req, res, next) => {
    try {
        const result = await articles.listArticle(req)
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

        let totalDoc = await articles.countDocuments()

        articles.dataTables({
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
module.exports = article
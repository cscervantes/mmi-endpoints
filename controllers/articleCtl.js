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
module.exports = article
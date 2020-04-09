const createError = require('http-errors');

const { websites } = require('../blueprints')

const crawl = {}

crawl.FECTH_SECTION_TO_CRAWL = async ( req, res, next ) => {
    try{
        let sections = await websites.find({}, {"_id": 1, "main_sections": 1 })
        res.status(200).send({'data': sections})
    }catch(error){
        next(createError(error))
    }
}

crawl.FIND_WEBSITE = async (req, res, next) => {
    try {
        let q = req.query
        let w = await websites.find({
            $or: [
                {'website_name': new RegExp(q.fqdn, 'gi')},
                {'website_url': new RegExp(q.fqdn, 'gi')},
                {'fqdn': new RegExp(q.fqdn, 'gi')},
                {'main_sections': new RegExp(q.fqdn, 'gi')}
            ]
        })
        res.status(200).send({'data': w})
    } catch (error) {
        next(createError(error))
    }
}

crawl.WEBSITE_STORE = async (req, res, next) => {
    try {
        let result = await websites.storeWebsite(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.WEBSITE_UPDATE = async (req, res, next) => {
    try {
        let result = await websites.updateWebsite(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.WEBSITE_DELETE = async (req, res, next) => { // this might be used in the future
    try {
        let result = await websites.deleteWebsite(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.SECTION_STORE = async (req, res, next) => {
    try {
        let result = await websites.storeSection(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.SECTION_UPDATE = async (req, res, next) => {
    try {
        let result = await websites.updateSection(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.SECTION_DELETE = async (req, res, next) => { // this might be used in the future
    try {
        let result = await websites.deleteSection(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.ARTICLE_STORE = async (req, res, next) => {
    try {
        let result = await websites.storeArticle(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.ARTICLE_UPDATE = async (req, res, next) => {
    try {
        let result = await websites.updateArticle(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.ARTICLE_DELETE = async (req, res, next) => { // this might be used in the future
    try {
        let result = await websites.deleteArticle(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = crawl
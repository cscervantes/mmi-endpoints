const createError = require('http-errors');

const { websites, sections, articles } = require('../blueprints')

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

crawl.COUNT_WEBSITE = async (req, res, next) => {
    try {
        let q = req.query
        let result = await websites.countDocuments({
            $or: [
                {'website_name': q.website_name },
                {'website_url': q.website_url },
                {'fqdn': q.fqdn },
                {'main_sections': new RegExp(q.section, 'gi') }
            ]
        })
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.FIND_SECTION = async (req, res, next) => {
    try {
        let q = req.query
        let result = await sections.find({
            "section_url" : q.section_url
        })
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.SECTION_STORE = async (req, res, next) => {
    try {
        let result = await sections.storeSection(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.SECTION_UPDATE = async (req, res, next) => {
    try {
        let result = await sections.updateSection(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.SECTION_DELETE = async (req, res, next) => { // this might be used in the future
    try {
        let result = await sections.deleteSection(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.COUNT_SECTION = async (req, res, next) => {
    try {
        let q = req.query
        let result = await sections.countDocuments({
            "section_url" : q.section_url
        })
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.ARTICLE_STORE = async (req, res, next) => {
    try {
        let result = await articles.storeArticle(req.body)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.ARTICLE_UPDATE = async (req, res, next) => {
    try {
        let result = await articles.updateArticle(req.body, req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.ARTICLE_DELETE = async (req, res, next) => { // this might be used in the future
    try {
        let result = await articles.deleteArticle(req.params.id)
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

crawl.COUNT_ARTICLE = async (req, res, next) => {
    try {
        let q = req.query
        let result = await articles.countDocuments({
            "article_url" : q.article_url, "article_status": q.article_status
        })
        res.status(200).send({'data': result})
    } catch (error) {
        next(createError(error))
    }
}

module.exports = crawl
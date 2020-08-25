const createError = require('http-errors');
const moment = require('moment')
const mongoose = require('mongoose')
const { websites, articles } = require('../blueprints')
const SQL = require('../helpers/sql');
const web = require('./webCtl');
const dashboards = {}


dashboards.WEBSITE_STATUS = async (req, res, next) => {
    try {
        let tDate = new Date()
        
        let qDate = req.query.duration

        let project = {}

        if(qDate){
            let numDay = parseInt(qDate.match(/([0-9]+)/g)[0])
            let wordDay = qDate.match(/([a-zA-Z]+)/g)[0]
            tDate = moment().subtract(numDay, wordDay).format()
            
            project["$match"] = {
                status: {
                    $regex: new RegExp(/(\w)/, "gi")
                },
                date_created: {
                    $lte: new Date(),
                    $gte: new Date(tDate)
                }
            }
        }else{
            project["$match"] = {
                status: {
                    $regex: new RegExp(/(\w)/, "gi")
                }
            }
        }
        
        websites.aggregate([
            {
                ...project
            },
            {
                $group: {   
                    _id: "$status",
                    count: { $sum: 1}
                }
            }
        ], function(err, result){
            if(err) throw Error(err);
            else res.status(200).send(result)
        })
    } catch (error) {
        next(createError(error))
    }
}

dashboards.WEBSITE_CATEGORY = async (req, res, next) => {
    try {
        let tDate = new Date()
        
        let qDate = req.query.duration

        let project = {}

        if(qDate){
            let numDay = parseInt(qDate.match(/([0-9]+)/g)[0])
            let wordDay = qDate.match(/([a-zA-Z]+)/g)[0]
            tDate = moment().subtract(numDay, wordDay).format()
            
            project["$match"] = {
                website_category: {
                    $regex: new RegExp(/(\w)/, "g")
                },
                date_created: {
                    $lte: new Date(),
                    $gte: new Date(tDate)
                }
            }
        }else{
            project["$match"] = {
                website_category: {
                    $regex: new RegExp(/(\w)/, "g")
                }
            }
        }
        
        websites.aggregate([
            {
                ...project
            },
            {
                $group: {   
                    _id: "$website_category",
                    count: { $sum: 1}
                }
            }
        ], function(err, result){
            if(err) throw Error(err);
            else res.status(200).send(result)
        })
    } catch (error) {
        next(createError(error))
    }
}

dashboards.WEBSITE_TYPE = async (req, res, next) => {
    try {
        let tDate = new Date()
        
        let qDate = req.query.duration

        let project = {}

        if(qDate){
            let numDay = parseInt(qDate.match(/([0-9]+)/g)[0])
            let wordDay = qDate.match(/([a-zA-Z]+)/g)[0]
            tDate = moment().subtract(numDay, wordDay).format()
            
            project["$match"] = {
                website_type: {
                    $regex: new RegExp(/(\w)/, "g")
                },
                date_created: {
                    $lte: new Date(),
                    $gte: new Date(tDate)
                }
            }
        }else{
            project["$match"] = {
                website_type: {
                    $regex: new RegExp(/(\w)/, "g")
                }
            }
        }
        
        websites.aggregate([
            {
              ...project
            },
            {
                $group: {   
                    _id: "$website_type",
                    count: { $sum: 1}
                }
            }
        ], function(err, result){
            if(err) throw Error(err);
            else res.status(200).send(result)
        })
    } catch (error) {
        next(createError(error))
    }
}

dashboards.ARTICLE_STATUS = async (req, res, next) => {
    try {
        
        let tDate = new Date()
        
        let qDate = req.query.duration

        let project = {}

        if(qDate){
            let numDay = parseInt(qDate.match(/([0-9]+)/g)[0])
            let wordDay = qDate.match(/([a-zA-Z]+)/g)[0]
            tDate = moment().subtract(numDay, wordDay).format()
            
            project["$match"] = {
                article_status: {
                    $regex: new RegExp(/(\w)/, "gi")
                },
                date_created: {
                    $lte: new Date(),
                    $gte: new Date(tDate)
                }
            }
        }else{
            project["$match"] = {
                article_status: {
                    $regex: new RegExp(/(\w)/, "gi")
                }
            }
        }
        
        articles.aggregate([
            {
                ...project
            },
            {
                $group: {   
                    _id: "$article_status",
                    count: { $sum: 1}
                }
            }
        ], function(err, result){
            if(err) throw Error(err);
            else res.status(200).send(result)
        })
    } catch (error) {
        next(createError(error))
    }
}

dashboards.ARTICLE_METRICS = async (req, res, next) => {
    try {
        let project = {}
        project["$match"] = {
            
            article_status: {
                $regex: new RegExp(/(\w)/, "gi")
            },
            website: mongoose.Types.ObjectId(req.body.website),
            date_created: {
                $lte: new Date(req.body.end_time),
                $gte: new Date(req.body.start_time)
            }
        }
        articles.aggregate([
            {
                ...project
            },
            {
                $group: {   
                    _id: "$article_status",
                    count: { $sum: 1}
                }
            }
        ], function(err, result){
            if(err) throw Error(err);
            else res.status(200).send(result)
        })
    } catch (error) {
        next(createError(error))
    }
}

dashboards.SOCIAL_MEDIA_STATUS = async (req, res, next) => {
    try {
        let to = moment(new Date()).format('Y-MM-DD')
        let qDate = req.query.duration
        let numDay = parseInt(qDate.match(/([0-9]+)/g)[0])
        let wordDay = qDate.match(/([a-zA-Z]+)/g)[0]
        let from = moment().subtract(numDay, wordDay).format('Y-MM-DD')
        let query = {
            sql: `
            SELECT COUNT(*) AS count, soc_source AS _id FROM socialmedia 
            WHERE soc_created_date >= "${from} 00:00:00" AND soc_created_date <= "${to} 23:59:59"
            GROUP BY soc_source
            `
        }
        // console.log(query)
        res.status(200).send(await SQL(query))
    } catch (error) {
        next(createError(error))
    }
}

dashboards.ARTICLE_PER_WEBSITE = async (req, res, next) => {
    try {
        let filter = req.query || {}
        if(filter.from || filter.to){
            filter.date_created = {
                $lte: new Date(filter.to) || new Date(),
                $gte: new Date(filter.from) || new Date()
            }
        }
        let fields = JSON.parse(req.query.fields)
        delete filter.fields
        delete filter.from
        delete filter.to
        let result = await articles.find(filter, fields)
        res.status(200).send(result)
    } catch (error) {
        // console.log(error)
        next(createError(error))
    }
}

module.exports = dashboards
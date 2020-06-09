const createError = require('http-errors');
const moment = require('moment')
const { websites, articles } = require('../blueprints')
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

module.exports = dashboards
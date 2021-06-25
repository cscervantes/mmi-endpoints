const createError = require('http-errors');
const moment = require('moment')
const mongoose = require('mongoose')
const { websites, articles } = require('../../blueprints');
// const { emit } = require('../../blueprints/websiteBp');
const crawler = {}

crawler.FREQUENCY = async (req, res, next) => {
    try {
        let gte = moment().subtract(7, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte = moment().utc().format('YYYY-MM-DDT16:00:00.000Z')

        let gte2 = moment().subtract(14, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte2 = moment().subtract(7, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        // let match = {
            // date_created: {
            //     "$gte": new Date(gte),
            //     "$lte": new Date(lte)
            // }
        // }
        // let result = await articles.mapReduce(
        //     [
        //         { $match: match },
        //         { $group: { _id: "$article_status", total: { $sum: 1 } } }
        //      ]
        // )
        let query = {
            date_created: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }

        let query2 = {
            date_created: {
                "$gte": new Date(gte2),
                "$lte": new Date(lte2)
            }
        }

        if (req.query.website){
            
            query.website = mongoose.Types.ObjectId(req.query.website)

            query2.website = mongoose.Types.ObjectId(req.query.website)

        }
        let result = await articles.countDocuments(query)

        let result2 = await articles.countDocuments(query2)

        let data = {
            "total_link_for_this_week": result,
            "avg_links_per_day": result / 7,
            "total_link_for_last_week": result2,
            "percentage_compare_previous_week": ((result2 / 7) / (result / 7)) * 100
        }

        res.status(200).send(data)
    } catch (error) {
        // console.log(error)
        next(createError(error))
    }
}

crawler.ARTICLE_STATUS = async (req, res, next) => {
    try {
        let gte = moment().subtract(1, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte = moment().utc().format('YYYY-MM-DDT16:00:00.000Z')
        let match = {
            date_created: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }

        if(req.query.website){
            match.website = mongoose.Types.ObjectId(req.query.website)
        }

        // console.log(match)
       
        let result = await articles.aggregate(
            [
                {$match: match},
                {$group:{_id:"$article_status", total: { $sum: 1}}}
            ]
        )
        result = result.map(function(v){
            return {
                status: v._id,
                total_links: v.total,
                percentage: ( v.total / result.reduce((a, b) => a + b.total, 0) ) * 100
            }
        })
        res.status(200).send(result)
    } catch (error) {
        // console.log(error)
        next(createError(error))
    }
}

crawler.ARTICLE_CREATED_BY = async (req, res, next) => {
    try {
        let gte = moment().subtract(1, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte = moment().utc().format('YYYY-MM-DDT16:00:00.000Z')
        let match = {
            date_created: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }

        if(req.query.website){
            match.website = mongoose.Types.ObjectId(req.query.website)
        }
       
        let result = await articles.aggregate(
            [
                {$match: match},
                {$group:{_id:"$created_by", total: { $sum: 1}}}
            ]
        )
        result = result.map(function(v){
            if ( v._id != "Global Link" && v._id != "Dynamic Global Link" && v._id != "System" ){
                v._id = "System"
            }
            return v
        })
        result = Object.values(result.reduce((a, o) => (a[o._id] ? a[o._id].total += o.total : a[o._id] = o, a), {}))
        result = result.map(function(v){
            return {
                created_by: v._id,
                total_links: v.total,
                percentage: ( v.total / result.reduce((a, b) => a + b.total, 0) ) * 100
            }
        })
        res.status(200).send(result)
    } catch (error) {
        // console.log(error)
        next(createError(error))
    }
}

module.exports = crawler
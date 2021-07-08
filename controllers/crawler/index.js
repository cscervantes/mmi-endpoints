const createError = require('http-errors');
const moment = require('moment')
const mongoose = require('mongoose')
const { websites, articles } = require('../../blueprints');
// const { emit } = require('../../blueprints/websiteBp');
const crawler = {}

const getMode = a => 
  Object.values(
    a.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e];
      }
      
      count[e][0]++;
      return count;
    }, {})
  ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1]

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

        let perc_comp = ( result > result2 ) ? ( ( result - result2 ) / result2 ) * 100 : ( ( result2 - result ) / result2 ) * 100

        let data = {
            "total_link_for_this_week": result,
            "avg_links_per_day": result / 7,
            "total_link_for_last_week": result2,
            // "percentage_compare_previous_week": ((result2 / 7) - (result / 7)) * 100
            "percentage_compare_previous_week": perc_comp
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

crawler.ACCEPTABLE_ARTICLES = async (req, res, next) => {
    try {
        let gte = moment().subtract(7, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte = moment().utc().format('YYYY-MM-DDT16:00:00.000Z')

        let gte2 = moment().subtract(14, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte2 = moment().subtract(7, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')

        let match = {
            article_status: "Done",
            article_publish_date: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }

        let match2 = {
            article_status: "Done",
            article_publish_date: {
                "$gte": new Date(gte2),
                "$lte": new Date(lte2)
            }
        }

        let articleCount = await articles.countDocuments(match)
        let acceptable = 0
        let acceptable2 = 0
        let unacceptable = 0
        let unacceptable2 = 0
        let modeArrAccepted = []
        let modeArrUnaccepted = []
        
        let articleDocs = await articles.find(match, {"article_publish_date": 1, "date_created":1})
        let articleDocs2 = await articles.find(match2, {"article_publish_date": 1, "date_created":1})
        
        for(let i = 0; i < articleDocs.length; i++){
            let t1 = moment(articleDocs[i]['date_created'])
            let t2 = moment(articleDocs[i]['article_date_publish'])
            let timeDiff = Math.abs(t1.diff(t2, 'minutes'))
            if(timeDiff <= 480){
                acceptable++
                modeArrAccepted.push(timeDiff)
            }
            else{
                unacceptable++
                modeArrUnaccepted.push(timeDiff)
            }
        }

        for(let i = 0; i < articleDocs2.length; i++){
            let t1 = moment(articleDocs2[i]['date_created'])
            let t2 = moment(articleDocs2[i]['article_date_publish'])
            let timeDiff = Math.abs(t1.diff(t2, 'minutes'))
            if(timeDiff <= 480){
                acceptable2++
            }
            else{
                unacceptable2++
            }
        }

        // console.log('This week', acceptable, unacceptable)
        // console.log('Last week', acceptable2, unacceptable2)

        let averageAcceptable = (acceptable/articleCount) * 100

        let averageUnacceptable = (unacceptable/articleCount) * 100

        let perc_comp = ( acceptable > acceptable2 ) ? ( ( acceptable - acceptable2 ) / acceptable2 ) * 100 : ( ( acceptable2 - acceptable ) / acceptable2 ) * 100
        
        let perc_comp2 = ( unacceptable > unacceptable2 ) ? ( ( unacceptable - unacceptable2 ) / unacceptable2 ) * 100 : ( ( unacceptable2 - unacceptable ) / unacceptable2 ) * 100
        

        let data = {
            "total_links": articleCount,
            "acceptable": {
                "t_links": acceptable, 
                "percentage": averageAcceptable,
                "mode_time_in_mins": getMode(modeArrAccepted),
                "compared_last_week": perc_comp
            },
            "unacceptable": {
                "t_links": unacceptable, 
                "percentage": averageUnacceptable,
                "mode_time_in_mins": getMode(modeArrUnaccepted),
                "compared_last_week": perc_comp2
            }
        }

        res.status(200).send(data)
    } catch (error) {
        // console.log(error)
        next(createError(error))
    }
}

crawler.ALWAYS_POSTING_WEBSITE = async (req, res, next) => {
    try {
        let gte = moment().subtract(7, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte = moment().utc().format('YYYY-MM-DDT16:00:00.000Z')
        let match = {
            article_status: "Done",
            article_publish_date: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }
        let website = await articles.aggregate(
            [
                {"$match": match},
                {"$lookup": {
                    from: "websites",
                    localField: "website",
                    foreignField: "_id",
                    as: "websites"
                }},
                {"$unwind": "$websites"},
                {
                    "$match":  { "websites.country_code": (req.query.country_code) ? req.query.country_code : "PHL" }
                },
                {"$group": {
                    _id: "$websites", total_articles: {"$sum":1}
                }},
                {
                    "$project": {
                        "_id.website_name":1,
                        "_id.alexa_rankings":1,
                        "_id.country_code":1,
                        "_id.country":1,
                        "total_articles":1
                    }
                },
                {
                    "$sort": { "total_articles": -1 }
                },
                {"$limit":1}
            ]
        )
        // console.log(website)
        let web = website.shift()
        let data = web
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

crawler.PER_WEBSITE_METRICS = async (req, res, next) => {
    try {
        let gte = moment().subtract(1, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
        let lte = moment().utc().format('YYYY-MM-DDT16:00:00.000Z')
        let match = {
            article_status: "Done",
            article_publish_date: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }
        }
        if (req.query.website){
            match.website = mongoose.Types.ObjectId(req.query.website)
        }

        let articleCount = await articles.countDocuments(match)
        let acceptable = 0
        let unacceptable = 0

        let data = {
            articleCount, acceptable, unacceptable
        }

        res.status(200).send(data)
    } catch (error) {
        next(createError(error))
    }
}
module.exports = crawler
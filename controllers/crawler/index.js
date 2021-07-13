const createError = require('http-errors');
const moment = require('moment')
const mongoose = require('mongoose')
const { websites, articles, section_logs } = require('../../blueprints');
// const { emit } = require('../../blueprints/websiteBp');
const _ = require('lodash')
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

const flatten=(obj)=>Object.values(obj).flat()

const flatten_array=(arr)=>[].concat.apply([],arr);

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
        let match_website = { "websites.country_code": (req.query.country_code) ? req.query.country_code : "PHL", "websites.is_priority": true }
        
        if(req.query.is_priority){
            match_website["websites.is_priority"] = false
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
                    "$match":  match_website
                },
                {"$group": {
                    _id: "$websites", total_articles: {"$sum":1}
                }},
                {
                    "$project": {
                        "_id._id":1,
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
                {"$limit":(req.query.limit) ? parseInt(req.query.limit) : 10}
            ]
        )
        let web = []
        for (let i = 0; i < website.length; i++){
            match.website = website[i]._id._id
            let r = await articles.aggregate([
                {"$match":match},
                {
                    "$project": {
                        date_published: "$article_publish_date",
                        date_captured: "$date_created",
                        hour: {
                            "$abs": {
                                "$divide": [
                                    {
                                        "$subtract":["$article_publish_date", "$date_created"]
                                    }, 3600000
                                ]
                            }
                        },
                        _id:1
                    }
                }
            ])
            let errors = await articles.countDocuments({article_status: "Error",
            date_created: {
                "$gte": new Date(gte),
                "$lte": new Date(lte)
            }})
            let average_attempts = await section_logs.aggregate([
                {
                    "$match": {
                        website: website[i]._id._id,
                        date_created: {
                            "$gte": new Date(gte),
                            "$lte": new Date(lte)
                        }
                    }
                },{
                    "$group": {
                        _id: "$website", averageAttempts: {"$avg": {"$sum": ["$attempts", 24]}}
                        // _id: "$website", averageAttempts: {$sum:"$attempts"}
                    }
                }
            ])
            let frequency_per_day = await articles.countDocuments(
                {
                    website: website[i]._id._id,
                    article_status: "Done",
                    article_publish_date: {
                        "$gte": moment().subtract(7, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z'),
                        "$lte": new Date(lte)
                    }
                }
            ) / 7
            let averageAttempts = average_attempts.shift().averageAttempts
            let accepted = r.filter(v=>v.hour <=8).length
            let unaccepted = r.filter(v=>v.hour > 8).length
            web.push({
                _id: website[i]._id._id,
                website: website[i]._id.website_name,
                ...website[i]._id.alexa_rankings,
                country: website[i]._id.country,
                country_code: website[i]._id.country_code,
                total_links: website[i].total_articles,
                accepted,acceptable_percentage:(accepted / website[i].total_articles) * 100, 
                unaccepted, unacceptable_percentage: (unaccepted / website[i].total_articles) * 100, 
                errors, averageAttempts, frequency_per_day
            })
        }
        let data = web
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

crawler.CAPTURE_TREND = async (req, res, next) => {
    try {
        let startDate = (req.query.start_date) ? new Date(req.query.start_date) : new Date(moment().subtract(7, 'days').format())
        let endDate = (req.query.end_date) ? new Date(req.query.end_date): new Date()
        let dateDiff = endDate.getDate() - startDate.getDate()
        console.log(startDate, endDate, dateDiff)
        let data = []
        for(let i = 1; i <= dateDiff; i++){
            let gte = moment(endDate).subtract(i, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
            let lte = moment(new Date(gte)).add(1, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
            let match = {
                article_status: "Done",
                article_publish_date: {
                    "$gte": new Date(gte),
                    "$lte": new Date(lte)
                }
            }
            let dateToday = moment(gte).format('MMM-D-YY')
            let match_website = { "websites.country_code": (req.query.country_code) ? req.query.country_code : "PHL", "websites.is_priority": true }
        
            if(req.query.is_priority){
                match_website["websites.is_priority"] = false
            }

            let result = await articles.aggregate([
                {
                    "$match": match
                },
                {"$lookup": {
                    from: "websites",
                    localField: "website",
                    foreignField: "_id",
                    as: "websites"
                }},
                {"$unwind": "$websites"},
                {
                    "$match":  match_website
                },
                {
                    "$project": {
                        date_published: "$article_publish_date",
                        date_captured: "$date_created",
                        hour: {
                            "$abs": {
                                "$divide": [
                                    {
                                        "$subtract":["$article_publish_date", "$date_created"]
                                    }, 3600000
                                ]
                            }
                        },
                        _id:1
                    }
                }
            ])

            let original_count = result.length
            let acceptable = result.filter(v=>v.hour <= 8)
            let unacceptable = result.filter(v=>v.hour > 8)
            console.log('Original Count', result.length, acceptable.length, unacceptable.length)
            data.push({
                "volume": original_count,
                "acceptable_percentage": Math.abs(( acceptable.length / original_count ) * 100),
                "unacceptable_percentage": Math.abs(( unacceptable.length / original_count ) * 100),
                "date": dateToday
            })
        }
        
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

crawler.ACCEPTABLE_ARTICLES_2 = async (req, res, next) => {
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

        let match_website = { "websites.country_code": (req.query.country_code) ? req.query.country_code : "PHL", "websites.is_priority": true }
        
        if(req.query.is_priority){
            match_website["websites.is_priority"] = false
        }

        let result = await articles.aggregate([
            {
                "$match": match
            },
            {"$lookup": {
                from: "websites",
                localField: "website",
                foreignField: "_id",
                as: "websites"
            }},
            {"$unwind": "$websites"},
            {
                "$match":  match_website
            },
            {
                "$project": {
                    date_published: "$article_publish_date",
                    date_captured: "$date_created",
                    hour: {
                        "$abs": {
                            "$divide": [
                                {
                                    "$subtract":["$article_publish_date", "$date_created"]
                                }, 3600000
                            ]
                        }
                    },
                    _id:1
                }
            }
        ])
        
        let total_links = result.length
        let acceptable = result.filter(v=>v.hour <= 8)
        let unacceptable = result.filter(v=>v.hour > 8)

        let result2 = await articles.aggregate([
            {
                "$match": match2
            },
            {"$lookup": {
                from: "websites",
                localField: "website",
                foreignField: "_id",
                as: "websites"
            }},
            {"$unwind": "$websites"},
            {
                "$match":  match_website
            },
            {
                "$project": {
                    date_published: "$article_publish_date",
                    date_captured: "$date_created",
                    hour: {
                        "$abs": {
                            "$divide": [
                                {
                                    "$subtract":["$article_publish_date", "$date_created"]
                                }, 3600000
                            ]
                        }
                    },
                    _id:1
                }
            }
        ])

        let acceptable2 = result2.filter(v=>v.hour <= 8)

        let unacceptable2 = result2.filter(v=>v.hour > 8)

        let averageAcceptable = (acceptable.length/total_links) * 100

        let averageUnacceptable = (unacceptable.length/total_links) * 100

        let perc_comp = ( acceptable.length > acceptable2.length ) ? ( ( acceptable.length - acceptable2.length ) / acceptable2.length ) * 100 : ( ( acceptable2.length - acceptable.length ) / acceptable2.length ) * 100
        
        let perc_comp2 = ( unacceptable.length > unacceptable2.length ) ? ( ( unacceptable.length - unacceptable2.length ) / unacceptable2.length ) * 100 : ( ( unacceptable2.length - unacceptable.length ) / unacceptable2.length ) * 100
        

        let data = {
            "total_links": total_links,
            "acceptable": {
                "t_links": acceptable.length, 
                "percentage": averageAcceptable,
                "mode_time_in_mins": getMode(acceptable.map(v=>v.hour)),
                "compared_last_week": perc_comp
            },
            "unacceptable": {
                "t_links": unacceptable.length, 
                "percentage": averageUnacceptable,
                "mode_time_in_mins": getMode(unacceptable.map(v=>v.hour)),
                "compared_last_week": perc_comp2
            }
        }
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        next(createError(error))
    }
}

crawler.ARTICLE_STATUS_TIMELINE = async (req, res, next) => {
    try {
        let startDate = (req.query.start_date) ? new Date(req.query.start_date) : new Date(moment().subtract(7, 'days').format())
        let endDate = (req.query.end_date) ? new Date(req.query.end_date): new Date()
        let dateDiff = endDate.getDate() - startDate.getDate()
        // console.log(startDate, endDate, dateDiff)
        let data = []
        for(let i = 1; i <= dateDiff; i++){
            let gte = moment(endDate).subtract(i, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
            let lte = moment(new Date(gte)).add(1, 'days').utc().format('YYYY-MM-DDT16:00:00.000Z')
            let match = {
                date_created: {
                    "$gte": new Date(gte),
                    "$lte": new Date(lte)
                }
            }
            let dateToday = moment(gte).format('MMM-D-YY')
            let match_website = { "websites.country_code": (req.query.country_code) ? req.query.country_code : "PHL", "websites.is_priority": true }
        
            if(req.query.is_priority){
                match_website["websites.is_priority"] = false
            }

            let result = await articles.aggregate([
                {
                    "$match": match
                },
                {"$lookup": {
                    from: "websites",
                    localField: "website",
                    foreignField: "_id",
                    as: "websites"
                }},
                {"$unwind": "$websites"},
                {
                    "$match":  match_website
                },
                {
                    "$group": {
                        _id: "$article_status", count: {"$sum":1}
                    }
                }
            ])
            result = result.map(function(v){
                obj = {}
                obj[v._id] = v.count
                // obj["percentage"] = ( v.count / result.reduce((a, b) => a + b.count, 0) ) * 100
                return obj
            })
            obj = Object.assign(...result)
            obj.date = dateToday
            data.push(obj)
        }
        
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        next(createError(error))
    }
}
module.exports = crawler
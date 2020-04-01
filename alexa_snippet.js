/**
 * This script is for getting the rankings from alex.com
 */

const request = require('request')
const S = require('string')
const cheerio = require('cheerio')

module.exports = function(fqdn, cb){
    var alexaUrl = 'http://www.alexa.com/siteinfo/'
    alexaUrl = alexaUrl+fqdn
    request.get(alexaUrl, function(error, response, body){
        if(error){
            return cb(error)
        }else{
            var $ = cheerio.load(body)
            try{
                var globalRank = $('div#card_rank section.rank .rank-global p.big.data').not('span.hash').text()
                globalRank = S(globalRank).replaceAll('#', '').s
                globalRank = S(globalRank).trim().s
                globalRank = S(globalRank).strip(',').s
                globalRank = parseInt(globalRank)
            }catch(e){
                var globalRank = 0
            }
            
            try{
                var localRank = $('#countrydropdown ul').removeAttr('style').children('li').eq(0).attr('data-value')
                localRank = S(localRank).replaceAll('#', '').s
                localRank = S(localRank).trim().s
                localRank = S(localRank).strip(',').s
                localRank = parseInt(localRank)
            }catch(e){
                var localRank = 0
            }

            try{
                var countryHighlight = $('#countrydropdown ul').removeAttr('style').children('li').not('span').eq(0).text()
                // countryHighlight = S(countryHighlight).replaceAll('#', '').s
                countryHighlight = S(countryHighlight).splitLeft(' ')
                countryHighlight = countryHighlight[1]
                countryHighlight = S(countryHighlight).trim().s
            }catch(e){
                var countryHighlight = 'Unknown'
            }
    
            // var jsonBody = {
            //     'rankings' : [
            //         {
            //             'location' : 'GLOBAL',
            //             'rank' : globalRank
            //         },
            //         {
            //             'location' : 'PH',
            //             'rank' : localRank
            //         }
            //     ]
            // };
            return cb(null, globalRank, localRank, countryHighlight)
        }
    })
}

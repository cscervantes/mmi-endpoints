const async = require('async')
module.exports = function(data, cb){
    console.log('Media Value Version 3.0');
    const website_cost = data.website[0].website_pub_cost
    const globalRank = data.website[0].website_global_rank
    const localRank = data.website[0].website_local_rank
    // const localRank = 0
    // const globalRank = 0
    let rank = 0
    let pub_cost = 0

    let wordCount = 0
    let imageCount = 0
    let videoCount = 0
    
    async.waterfall([
        function(cb){
            if(localRank != 0){
                rank = localRank
                return cb()
            }else if(globalRank != 0){
                rank = globalRank
                return cb()
            }else{
                rank = 0
                return cb()
            }
            
        }, function(cb){
            if(website_cost != 0){
                pub_cost = website_cost
                return cb()
            }else{
                pub_cost = 200
                return cb()
            }
            
        }, function(cb){
            wordCount = data.raw.content.split(' ').length
            imageCount = data.raw.multimedia.images.length
            videoCount = data.raw.multimedia.videos.length
            return cb()
        }, function(cb){
            console.log("Website Type:", data.website[0].website_category);
            console.log("Rank:", rank);
            console.log("Pub Cost:", pub_cost);
            console.log("Word Count:", wordCount);
            console.log("Image Count:", imageCount);
            console.log("Video Count:", videoCount);
            if(wordCount >= 1){
                wordCount += 100
                console.log("This article has an image, adding 100 to the word count.\nNew word count: " + wordCount);
            }else if(wordCount == 1000){
                wordCount = 100
                console.log("This article is more than 1000 words, max number of words is 1k so we'll set it to default.");
            }

            if(rank >= 501 || rank === 0){
                console.log("Rank 501 & up : pubCost=180");
                pub_cost = 180;
            }

            let adValue = wordCount * pub_cost;


            // Getting the PR Value

            let addedPrValue = 0;

            // Ranking

            if(rank <= 10 && rank > 0){
                console.log("Rank 1-10 : plus 100%");
                addedPrValue = addedPrValue + adValue;
            }
            else if(rank >= 11 && rank <= 50){
                console.log("Rank 11-50 : plus 75%");
                addedPrValue = addedPrValue + (adValue * 0.75);
            }
            else if(rank >= 51 && rank <= 100){
                console.log("Rank 51-100 : plus 50%");
                addedPrValue = addedPrValue + (adValue * 0.50);
            }
            else if(rank >= 101 && rank <= 500){
                console.log("Rank 101-500 : plus 40%");
                addedPrValue = addedPrValue + (adValue * 0.40);
            }
            else if(rank >= 501 || rank === 0){
                console.log("Rank 501 & up : plus 30%");
                addedPrValue = addedPrValue + (adValue * 0.30);
            }

            // Video

            if(videoCount >= 1){
                console.log("Has video: plus 20%");
                addedPrValue = addedPrValue + (adValue * 0.20);
            }

            var prValue = adValue + addedPrValue;

            console.log("Ad Value:", adValue);
            console.log("Added PR Value:", addedPrValue);
            console.log("PR Value:", prValue);

            return cb(null, adValue, prValue);

        }
    ], function(err, adVal, prVal){
       if(err){
           return cb(err)
       }else{
           return cb(null, adVal, prVal)
       }
    })
}
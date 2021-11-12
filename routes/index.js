var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const guard = require('../auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    // res.status(200).send(req.headers)
    res.status(200).send('MMI endpoints')
  } catch (error) {
    next(createError(error))
  }
});

require('./web')('/web', guard, router)
require('./article')('/article', guard, router)
require('./section')('/section', guard, router)
require('./users')('/users', guard, router)
require('./crawl')('/crawl', guard, router)
require('./queue')('/queue', guard, router)
require('./dashboard')('/dashboard', guard, router)
require('./media')('/media', guard, router)
require('./link')('/link', guard, router)
require('./articleTest')('/article-test', guard, router)
require('./globalLink')('/global-link', guard, router)
require('./rawWebsite')('/raw-website', guard, router)
require('./keywordLink')('/keyword-link', guard, router)
require('./sectionLog')('/section-log', guard, router)
require('./sectionLink')('/section-link', guard, router)
require('./articleStage')('/article-stage', guard, router)
require('./crawler')('/crawler-dashboard', guard, router)
require('./potchInstance')('/potch-instance', guard, router)
require('./markAnalyzer')('/mark-analyzer', guard, router)
require('./linkClassifier')('/link-classifier', guard, router)
require('./linkTagger')('/link-tagger', guard, router)
require('./mapper')('/mapper', guard, router)
require('./rawUrl')('/raw-url', guard, router)
require('./redisArticle')('/redis-article', guard, router)


module.exports = router;

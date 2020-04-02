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
require('./crawl')('/crawl', router)

module.exports = router;

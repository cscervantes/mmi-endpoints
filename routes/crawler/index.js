const { crawlerDashboard } = require('../../controllers')

module.exports = async (name, auth, router) => {
    router.get(name+'/frequency', auth, await crawlerDashboard.FREQUENCY)
    router.get(name+'/article-status', auth, await crawlerDashboard.ARTICLE_STATUS)
    router.get(name+'/article-created-by', auth, await crawlerDashboard.ARTICLE_CREATED_BY)
}
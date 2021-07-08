const { crawlerDashboard } = require('../../controllers')

module.exports = async (name, auth, router) => {
    router.get(name+'/frequency', auth, await crawlerDashboard.FREQUENCY)
    router.get(name+'/article-status', auth, await crawlerDashboard.ARTICLE_STATUS)
    router.get(name+'/article-created-by', auth, await crawlerDashboard.ARTICLE_CREATED_BY)
    router.get(name+'/accepted-articles', auth, await crawlerDashboard.ACCEPTABLE_ARTICLES)
    router.get(name+'/always-posting-website', auth, await crawlerDashboard.ALWAYS_POSTING_WEBSITE)
    router.get(name+'/per-website-metrics', auth, await crawlerDashboard.PER_WEBSITE_METRICS)
}
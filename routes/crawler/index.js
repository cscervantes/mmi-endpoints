const { crawlerDashboard } = require('../../controllers')

module.exports = async (name, auth, router) => {
    router.get(name+'/frequency', auth, await crawlerDashboard.FREQUENCY)
    router.get(name+'/article-status', auth, await crawlerDashboard.ARTICLE_STATUS)
    router.get(name+'/article-created-by', auth, await crawlerDashboard.ARTICLE_CREATED_BY)
    router.get(name+'/accepted-articles', auth, await crawlerDashboard.ACCEPTABLE_ARTICLES)
    router.get(name+'/accepted-articles-2', auth, await crawlerDashboard.ACCEPTABLE_ARTICLES_2)
    router.get(name+'/always-posting-website', auth, await crawlerDashboard.ALWAYS_POSTING_WEBSITE)
    router.get(name+'/per-website-metrics', auth, await crawlerDashboard.PER_WEBSITE_METRICS)
    router.get(name+'/capture-trend', auth, await crawlerDashboard.CAPTURE_TREND)
    router.get(name+'/article-status-timeline', auth, await crawlerDashboard.ARTICLE_STATUS_TIMELINE)
    router.get(name+'/article-elapse-timeline', auth, await crawlerDashboard.ARTICLE_ELAPSE_TIMELINE)
    router.get(name+'/publication-frequency', auth, await crawlerDashboard.PUBLICATION_FREQUENCY)
    router.get(name+'/publication-frequency-per-hour', auth, await crawlerDashboard.PUBLICATION_FREQUENCY_PER_HOURS)
}
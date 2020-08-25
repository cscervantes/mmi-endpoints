const { dashboardCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    router.get(name+'/website_status', auth, await dashboardCtl.WEBSITE_STATUS)

    router.get(name+'/website_category', auth, await dashboardCtl.WEBSITE_CATEGORY)

    router.get(name+'/website_type', auth, await dashboardCtl.WEBSITE_TYPE)

    router.get(name+'/article_status', auth, await dashboardCtl.ARTICLE_STATUS)

    router.post(name+'/article_metrics', auth, await dashboardCtl.ARTICLE_METRICS)
    
    router.get(name+'/social_media_status', auth, await dashboardCtl.SOCIAL_MEDIA_STATUS)

    router.get(name+'/article_per_website', await dashboardCtl.ARTICLE_PER_WEBSITE)

}
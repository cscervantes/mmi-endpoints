const { dashboardCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    router.get(name+'/website_status', await dashboardCtl.WEBSITE_STATUS)

    router.get(name+'/website_category', await dashboardCtl.WEBSITE_CATEGORY)

    router.get(name+'/website_type', await dashboardCtl.WEBSITE_TYPE)

    router.get(name+'/article_status', await dashboardCtl.ARTICLE_STATUS)

}
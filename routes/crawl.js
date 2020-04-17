const { crawlCtl } = require('../controllers')

module.exports = async (name, router) => {
    router.get(name, await crawlCtl.FECTH_SECTION_TO_CRAWL)

    router.get(name+'/website', await crawlCtl.FIND_WEBSITE)
    router.get(name+'/website/count', await crawlCtl.COUNT_WEBSITE)
    router.post(name+'/website', await crawlCtl.WEBSITE_STORE)
    router.put(name+'/website/:id', await crawlCtl.WEBSITE_UPDATE)
    router.delete(name+'/website/:id', await crawlCtl.WEBSITE_DELETE)

    router.post(name+'/section', await crawlCtl.SECTION_STORE)
    router.put(name+'/section/:id', await crawlCtl.SECTION_UPDATE)
    router.delete(name+'/section/:id', await crawlCtl.SECTION_DELETE)

    router.post(name+'/article', await crawlCtl.ARTICLE_STORE)
    router.put(name+'/article/:id', await crawlCtl.ARTICLE_UPDATE)
    router.delete(name+'/article/:id', await crawlCtl.ARTICLE_DELETE)
}
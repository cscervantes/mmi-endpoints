const { crawlCtl } = require('../controllers')
const crawl = require('../controllers/crawlCtl')

module.exports = async (name, auth, router) => {
    router.get(name, auth, await crawlCtl.FECTH_SECTION_TO_CRAWL)
    router.get(name+'/last_modified_active_websites', auth, await crawlCtl.ADD_LAST_MODIFIED_TO_CRAWL)
    router.get(name+'/crawl_active_websites', auth, await crawl.CRAWL_ACTIVE_WEBSITES)

    router.get(name+'/website', auth, await crawlCtl.FIND_WEBSITE)
    router.get(name+'/website/count', auth, await crawlCtl.COUNT_WEBSITE)
    router.post(name+'/website', auth, await crawlCtl.WEBSITE_STORE)
    router.put(name+'/website/:id', auth, await crawlCtl.WEBSITE_UPDATE)
    router.delete(name+'/website/:id', auth, await crawlCtl.WEBSITE_DELETE)

    router.get(name+'/section', auth, await crawlCtl.FIND_SECTION)
    router.get(name+'/section/count', auth, await crawlCtl.COUNT_SECTION)
    router.post(name+'/section', auth, await crawlCtl.SECTION_STORE)
    router.put(name+'/section/:id', auth, await crawlCtl.SECTION_UPDATE)
    router.delete(name+'/section/:id', auth, await crawlCtl.SECTION_DELETE)

    router.post(name+'/article', auth, await crawlCtl.ARTICLE_STORE)
    router.get(name+'/article/count', auth, await crawlCtl.COUNT_ARTICLE)
    router.put(name+'/article/:id', auth, await crawlCtl.ARTICLE_UPDATE)
    router.delete(name+'/article/:id', auth, await crawlCtl.ARTICLE_DELETE)
}
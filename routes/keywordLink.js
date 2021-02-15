const { keywordLinkCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.post(name+'/datatables', auth, await keywordLinkCtl.DATATABLES)

    router.post(name+'/custom_query', auth, await keywordLinkCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await keywordLinkCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await keywordLinkCtl.ID)

    router.post(name, auth, await keywordLinkCtl.CREATE)

    router.put(name+'/:id', auth, await keywordLinkCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await keywordLinkCtl.DELETE)

}
const { globalLinkCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.post(name+'/custom_query', auth, await globalLinkCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await globalLinkCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await globalLinkCtl.ID)

    router.post(name, auth, await globalLinkCtl.CREATE)

    router.put(name+'/:id', auth, await globalLinkCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await globalLinkCtl.DELETE)

}
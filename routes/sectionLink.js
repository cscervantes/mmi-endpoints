const { sectionLinkCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.post(name+'/custom_query', auth, await sectionLinkCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await sectionLinkCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await sectionLinkCtl.ID)

    router.post(name, auth, await sectionLinkCtl.CREATE)

    router.put(name+'/:id', auth, await sectionLinkCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await sectionLinkCtl.DELETE)

}
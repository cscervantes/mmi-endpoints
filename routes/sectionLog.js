const { sectionLogCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.post(name+'/custom_query', auth, await sectionLogCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await sectionLogCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await sectionLogCtl.ID)

    router.post(name, auth, await sectionLogCtl.CREATE)

    router.put(name+'/:id', auth, await sectionLogCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await sectionLogCtl.DELETE)

}
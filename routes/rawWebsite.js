const { rawWebsiteCtl } = require('../controllers')

module.exports = async (name, auth, router) => {
    
    // CUSTOM API

    router.post(name+'/datatables', auth, await rawWebsiteCtl.DATATABLES)
    
    router.post(name+'/count', auth, await rawWebsiteCtl.COUNT)

    router.post(name+'/query', auth, await rawWebsiteCtl.QUERY)

    router.post(name+'/count_custom_query', auth, await rawWebsiteCtl.COUNT_CUSTOM_QUERY)
    
    router.post(name+'/custom_query', auth, await rawWebsiteCtl.CUSTOM_QUERY)

    // CRUD

    router.get(name, auth, await rawWebsiteCtl.READ)

    router.get(name+'/:id', auth, await rawWebsiteCtl.VIEW_BY_ID)

    router.post(name, auth, await rawWebsiteCtl.CREATE)

    router.put(name+'/:id', auth, await rawWebsiteCtl.UPDATE)

    router.delete(name+'/:id', auth, await rawWebsiteCtl.DELETE)

}
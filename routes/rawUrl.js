const { rawUrlCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    // router.post(name+'/datatables', auth, await rawUrlCtl.DATATABLES)

    router.post(name+'/custom_query', auth, await rawUrlCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await rawUrlCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await rawUrlCtl.ID)

    router.post(name, auth, await rawUrlCtl.CREATE)

    router.put(name+'/:id', auth, await rawUrlCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await rawUrlCtl.DELETE)

}
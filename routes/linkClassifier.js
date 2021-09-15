const { linkClassifierCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    // router.post(name+'/datatables', auth, await linkClassifierCtl.DATATABLES)

    router.post(name+'/custom_query', auth, await linkClassifierCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await linkClassifierCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await linkClassifierCtl.ID)

    router.post(name, auth, await linkClassifierCtl.CREATE)

    router.put(name+'/:id', auth, await linkClassifierCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await linkClassifierCtl.DELETE)

}
const { mapperCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    // router.post(name+'/datatables', auth, await mapperCtl.DATATABLES)

    router.post(name+'/custom_query', auth, await mapperCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await mapperCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await mapperCtl.ID)

    router.post(name, auth, await mapperCtl.CREATE)

    router.put(name+'/:id', auth, await mapperCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await mapperCtl.DELETE)

}
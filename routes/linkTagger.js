const { linkTaggerCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    // router.post(name+'/datatables', auth, await linkTaggerCtl.DATATABLES)

    router.post(name+'/custom_query', auth, await linkTaggerCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await linkTaggerCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await linkTaggerCtl.ID)

    router.post(name, auth, await linkTaggerCtl.CREATE)

    router.put(name+'/:id', auth, await linkTaggerCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await linkTaggerCtl.DELETE)

}
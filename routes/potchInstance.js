const { potchInstanceCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    // custom API
    router.post(name+'/datatables', auth, await potchInstanceCtl.DATATABLES)

    router.get(name+'/count', auth, await potchInstanceCtl.COUNT_ARTICLE)

    router.post(name+'/count', auth, await potchInstanceCtl.COUNT_IF_EXIST)

    router.post(name+'/custom_query', auth, await potchInstanceCtl.CUSTOM_QUERY)

    router.post(name+'/count_custom_query', auth, await potchInstanceCtl.COUNT_CUSTOM_QUERY)

    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await potchInstanceCtl.LIST)

    router.get(name+'/:id', auth, await potchInstanceCtl.FIND_BY_ID)

    router.post(name, auth, await potchInstanceCtl.STORE)

    router.put(name+'/:id', auth, await potchInstanceCtl.UPDATE )

    router.delete(name+'/:id', auth, await potchInstanceCtl.DELETE)

}
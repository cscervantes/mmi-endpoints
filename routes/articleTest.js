const { articleTestCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    // custom API
    router.post(name+'/datatables', auth, await articleTestCtl.DATATABLES)

    router.get(name+'/count', auth, await articleTestCtl.COUNT_ARTICLE)

    router.post(name+'/count', auth, await articleTestCtl.COUNT_IF_EXIST)

    router.post(name+'/custom_query', auth, await articleTestCtl.CUSTOM_QUERY)

    router.post(name+'/count_custom_query', auth, await articleTestCtl.COUNT_CUSTOM_QUERY)

    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await articleTestCtl.LIST)

    router.get(name+'/:id', auth, await articleTestCtl.FIND_BY_ID)

    router.post(name, auth, await articleTestCtl.STORE)

    router.put(name+'/:id', auth, await articleTestCtl.UPDATE )

    router.delete(name+'/:id', auth, await articleTestCtl.DELETE)

}
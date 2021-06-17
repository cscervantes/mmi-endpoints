const { articleStageCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    // custom API
    router.post(name+'/datatables', auth, await articleStageCtl.DATATABLES)

    router.get(name+'/count', auth, await articleStageCtl.COUNT_ARTICLE)

    router.post(name+'/count', auth, await articleStageCtl.COUNT_IF_EXIST)

    router.post(name+'/custom_query', auth, await articleStageCtl.CUSTOM_QUERY)

    router.post(name+'/count_custom_query', auth, await articleStageCtl.COUNT_CUSTOM_QUERY)

    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await articleStageCtl.LIST)

    router.get(name+'/:id', auth, await articleStageCtl.FIND_BY_ID)

    router.post(name, auth, await articleStageCtl.STORE)

    router.put(name+'/:id', auth, await articleStageCtl.UPDATE )

    router.delete(name+'/:id', auth, await articleStageCtl.DELETE)

}
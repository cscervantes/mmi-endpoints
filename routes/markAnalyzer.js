const { markAnalyzerCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    // custom API
    router.post(name+'/datatables', auth, await markAnalyzerCtl.DATATABLES)

    router.get(name+'/count', auth, await markAnalyzerCtl.COUNT_ARTICLE)

    router.post(name+'/count', auth, await markAnalyzerCtl.COUNT_IF_EXIST)

    router.post(name+'/custom_query', auth, await markAnalyzerCtl.CUSTOM_QUERY)

    router.post(name+'/count_custom_query', auth, await markAnalyzerCtl.COUNT_CUSTOM_QUERY)

    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await markAnalyzerCtl.LIST)

    router.get(name+'/:id', auth, await markAnalyzerCtl.FIND_BY_ID)

    router.post(name, auth, await markAnalyzerCtl.STORE)

    router.put(name+'/:id', auth, await markAnalyzerCtl.UPDATE )

    router.delete(name+'/:id', auth, await markAnalyzerCtl.DELETE)

}
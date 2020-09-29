const { webCtl } = require('../controllers')

module.exports = async (name, auth, router) => {
    
    // CUSTOM API

    router.post(name+'/datatables', auth, await webCtl.DATATABLES)

    router.post(name+'/with_null_fields', auth, await webCtl.WITH_NULL_FIELDS)

    router.post(name+'/count_custom_query', auth, await webCtl.COUNT_CUSTOM_QUERY)

    // CRUD

    router.get(name, auth, await webCtl.LIST)

    router.get(name+'/:id', auth, await webCtl.FIND_BY_ID)

    router.post(name, auth, await webCtl.STORE)

    router.put(name+'/:id', auth, await webCtl.UPDATE )

    router.delete(name+'/:id', auth, await webCtl.DELETE)

}
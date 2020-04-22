const { articleCtl } = require('../controllers')

module.exports = async (name, auth, router) => {

    // custom API
    router.post(name+'/datatables', auth, await articleCtl.DATATABLES)

    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await articleCtl.LIST)

    router.get(name+'/:id', auth, await articleCtl.FIND_BY_ID)

    router.post(name, auth, await articleCtl.STORE)

    router.put(name+'/:id', auth, await articleCtl.UPDATE )

    router.delete(name+'/:id', auth, await articleCtl.DELETE)

}
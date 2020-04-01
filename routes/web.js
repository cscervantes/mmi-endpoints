const { webCtl } = require('../controllers')

module.exports = async (name, auth, router) => {
    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await webCtl.LIST)

    router.get(name+'/:id', auth, await webCtl.FIND_BY_ID)

    router.post(name, auth, await webCtl.STORE)

    router.put(name+'/:id', auth, await webCtl.UPDATE )

    router.delete(name+'/:id', auth, await webCtl.DELETE)

}
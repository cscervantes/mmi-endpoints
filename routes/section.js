const { sectionCtl } = require('../controllers')

module.exports = async (name, auth, router) => {
    // router.get(name, auth, await webCtl.HOME)
    router.get(name, auth, await sectionCtl.LIST)

    router.get(name+'/:id', auth, await sectionCtl.FIND_BY_ID)

    router.post(name, auth, await sectionCtl.STORE)

    router.put(name+'/:id', auth, await sectionCtl.UPDATE )

    router.delete(name+'/:id', auth, await sectionCtl.DELETE)

}
const { rawWebsiteCtl } = require('../controllers')

module.exports = async (name, auth, router) => {
    
    // CUSTOM API
    
    router.post(name+'/count', auth, await rawWebsiteCtl.COUNT)

    // CRUD

    router.get(name, auth, await rawWebsiteCtl.READ)

    router.get(name+'/:id', auth, await rawWebsiteCtl.VIEW_BY_ID)

    router.post(name, auth, await rawWebsiteCtl.CREATE)

    router.put(name+'/:id', auth, await rawWebsiteCtl.UPDATE)

    router.delete(name+'/:id', auth, await rawWebsiteCtl.DELETE)

}
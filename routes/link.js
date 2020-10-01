const { linkCtl } = require('../controllers')
const link = require('../controllers/linkCtl')

module.exports = async (name,  auth, router) => {

    // router.all(name, auth, [
    //     await link.ID, 
    //     await link.CREATE,
    //     await link.UPDATE,
    //     await link.DELETE
    // ])
    router.get(name, auth, await link.ID)
    router.post(name, auth, await link.CREATE)
    router.put(name, auth, await link.UPDATE)
    router.delete(name, auth, await link.DELETE)
}
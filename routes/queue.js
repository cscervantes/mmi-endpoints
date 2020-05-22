const { queueCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.get(name, await queueCtl.LIST)

    router.post(name, auth, await queueCtl.STORE)
    
    router.delete(name+'/:id', auth, await queueCtl.DELETE)

}
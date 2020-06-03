const { queueCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.get(name, auth, await queueCtl.LIST)

    router.get(name+'/count', auth, await queueCtl.COUNT)

    router.post(name, auth, await queueCtl.STORE)
    
    router.delete(name+'/:id', auth, await queueCtl.DELETE)

}
const { linkCtl } = require('../controllers')
const link = require('../controllers/linkCtl')

module.exports = async (name,  auth, router) => {

    router.get(name+'/custom_query', auth, await link.CUSTOM_QUERY)
    
    router.get(name, auth, await link.ID)
    router.post(name, auth, await link.CREATE)
    router.put(name, auth, await link.UPDATE)
    router.delete(name, auth, await link.DELETE)

}
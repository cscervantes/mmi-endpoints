const { linkCtl } = require('../controllers')
const link = require('../controllers/linkCtl')

module.exports = async (name,  auth, router) => {

    router.post(name+'/custom_query', auth, await link.CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await link.ID)
    router.post(name, auth, await link.CREATE)
    router.put(name+'/:id', auth, await link.UPDATE)
    router.delete(name+'/:id', auth, await link.DELETE)

}
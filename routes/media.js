const { mediaCtl } = require('../controllers')
const media = require('../controllers/mediaCtl')

module.exports = async (name,  auth, router) => {

    router.post(name+'/count', auth, await mediaCtl.COUNT)

    router.post(name+'/insert_raw', auth, await mediaCtl.INSERT_TO_RAW)

    router.post(name+'/query_builder', auth, await mediaCtl.CUSTOM_QUERY)
}
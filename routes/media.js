const { mediaCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    router.post(name+'/count', await mediaCtl.COUNT)

    router.post(name+'/insert_raw', await mediaCtl.COUNT)

}
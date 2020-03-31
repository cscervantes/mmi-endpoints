const { crawlCtl } = require('../controllers')

module.exports = async (name, auth, router) => {
    router.get(name, auth, await crawlCtl.HOME)
}
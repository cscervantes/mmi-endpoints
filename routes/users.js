const { userCtl } = require('../controllers')

module.exports = async function(name, auth, router){

  router.get(name, auth, await userCtl.Lists)
  
  router.post(name, auth, await userCtl.Login)

}
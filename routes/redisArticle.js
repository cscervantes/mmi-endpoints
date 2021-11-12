const { redisArticleCtl } = require('../controllers')

module.exports = async (name,  auth, router) => {

    // router.post(name+'/datatables', auth, await redisArticleCtl.DATATABLES)

    router.post(name+'/custom_query', auth, await redisArticleCtl.CUSTOM_QUERY)
    
    router.post(name+'/count_custom_query', auth, await redisArticleCtl.COUNT_CUSTOM_QUERY)
    
    router.get(name+'/:id', auth, await redisArticleCtl.ID)

    router.post(name, auth, await redisArticleCtl.CREATE)

    router.put(name+'/:id', auth, await redisArticleCtl.UPDATE)
    
    router.delete(name+'/:id', auth, await redisArticleCtl.DELETE)

}
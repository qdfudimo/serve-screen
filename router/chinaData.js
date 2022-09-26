const {
    commonRouter
} = require("./commonRouter")
const router = require('koa-router')()

router.post('/', async ctx => {
    let yqData = commonRouter("chinaData")
    ctx.body = {
        code: 200,
        data: yqData,
        msg: "成功"
    }
})
module.exports = router.routes();
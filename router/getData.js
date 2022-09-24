const router = require('koa-router')()
const path = require('path')
const {
    getData
} = require("../api")
const {
    formatTime
} = require("../util/moment")
const fs = require('fs')
// router.prefix('/comic_admin_users') 生成路由前缀
let fileName = formatTime()
router.post('/', async ctx => {
    const configFile = path.resolve(__dirname, `../json/${fileName}.json`)
    let checkDir = fs.existsSync(configFile);
    let yqData = ""
    if (checkDir) {
        yqData = fs.readFileSync(configFile, 'utf-8');
        yqData = JSON.parse(yqData)
    } else {
        yqData = await getData()
        if (!yqData) {
            yqData = fs.readFileSync(path.resolve(__dirname, `../json/2022.json`), 'utf-8');
            yqData = JSON.parse(yqData)
        }
    }
    ctx.body = {
        code: 200,
        data: yqData,
        msg: "成功"
    }
})
module.exports = router.routes();
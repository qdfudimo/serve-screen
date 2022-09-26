const koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const logger = require("koa-logger");
const Moment = require('moment')
// const cors = require('koa2-cors')
const app = new koa()
app.use(bodyParser())
app.use(logger(str => {
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str)
  }))
// app.use(cors())
const {scheduleCronstyle} = require("./schedule/index")
// scheduleCronstyle()
// scheduleDelFile()
const worldData = require("./router/worldData")
const chinaData = require("./router/chinaData")
router.use("/chinaDayList", chinaData)
router.use("/worldDayList", worldData)
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods());
/* 作用：这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配
router.routes()之后,目的在于：根据ctx.status 设置response 响应头
router.allowedMethods()中间件，主要用于 405 Method Not Allowed 这个状态码相关
如果不加这个中间件，如果接口是get请求，而前端使用post请求，会返回 404 状态码，接口未定义。
如果加了这个中间件，这种情况时，会返回405 Method Not Allowed ，
提示 request method 不匹配，并在响应头返回接口支持的请求方法，更有利于调试
*/
// app.use(router.routes()).use(router.allowedMethods())
//监听4001
app.listen(4001, () => {
    console.log('starting at port 4001');
})
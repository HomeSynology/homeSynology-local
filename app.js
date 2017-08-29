const Koa = require('Koa');
const logger = require('koa-logger');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./app/router');
const axios = require('axios')
const _ = require('lodash')

const config = require('./app/config')
const Reqio = require('./app/reqio')
const reqio = new Reqio(config)
let socket = reqio.connect()
socket.on('beat', function (data) {
  console.log('beat', data)
})
socket.on('getapi', async function (data) {
  const url = `http://${config.synoHost}${data.url}`
  socket.emit('new', '测试new是否成功')
  socket.emit('my other event', '测试是否emit成功')
  try {
    const res = await axios(url)
    const result = _.assignIn(res.data, {socketId: socket.id})
    socket.emit('getapiback', res.data)
  } catch (err) {
    console.error('error', err)
  }
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())


module.exports = app;

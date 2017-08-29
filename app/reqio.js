const io = require('socket.io-client')
const _ = require('lodash')
const config = require('./config')
let isConnect = false


class Reqio{
  constructor(params){
    console.log('init Reqio')
    this.options = params
  }

  connect(){
    const url = `http://${this.options.socketIP}:${this.options.socketPort}?synoKey=${config.synoKey}`
    console.log(url)
    this.socket = io.connect(url);
    return this.socket
  }

}

module.exports = Reqio

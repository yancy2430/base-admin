/* eslint-disable */
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
/*CIM服务器IP*/
const CIM_HOST = 'localhost'
/*
 * 服务端 websocket端口
 */
const CIM_PORT = 5858
const CIM_URI = 'ws://' + CIM_HOST + ':' + CIM_PORT

const APP_VERSION = '1.0.0'
const APP_CHANNEL = 'browser'
const APP_PACKAGE = 'com.farsunset.cim'

/*
 *特殊的消息类型，代表被服务端强制下线
 */
const ACTION_999 = '999'
const DATA_HEADER_LENGTH = 1

const MESSAGE = 2
const REPLY_BODY = 4

let socket
let manualStop = false
const CIMPushManager = {}
const onConnect = CIMPushManager.connect = function () {
  manualStop = false
  window.localStorage.account = ''
  socket = new WebSocket(CIM_URI)
  socket.cookieEnabled = false
  socket.binaryType = 'arraybuffer'
  socket.onopen = CIMPushManager.innerOnConnectFinished
  socket.onmessage = CIMPushManager.innerOnMessageReceived
  socket.onclose = CIMPushManager.innerOnConnectionClosed
}

const onbindAccount = CIMPushManager.bindAccount = function (account) {
  window.localStorage.account = account

  let deviceId = window.localStorage.deviceIddeviceId
  if (deviceId == '' || deviceId == undefined) {
    deviceId = generateUUID()
    window.localStorage.deviceId = deviceId
  }

  let browser = getBrowser()
  let body = {
    key: 'client_bind',
    account: account,
    channel: APP_CHANNEL,
    appVersion: APP_VERSION,
    osVersion: browser.version,
    packageName: APP_PACKAGE,
    deviceId: deviceId,
    device: browser.name
  }
  CIMPushManager.sendRequest(body)
}

CIMPushManager.stop = function () {
  manualStop = true
  socket.close()
}

CIMPushManager.resume = function () {
  manualStop = false
  CIMPushManager.connect()
}

CIMPushManager.innerOnConnectFinished = function () {
  let account = storage.get(ACCESS_TOKEN)
  if (account === '' || account === undefined) {
    if (window.onConnectFinished instanceof Function) {
      window.onConnectFinished()
    }
  } else {
    CIMPushManager.bindAccount(account)
  }
}

CIMPushManager.innerOnMessageReceived = function (e) {

  onInterceptMessageReceived(JSON.parse(e.data))

  // if (type == REPLY_BODY) {
  //   let message = proto.com.farsunset.cim.sdk.web.model.ReplyBody.deserializeBinary(body);
  //   /**
  //    * 将proto对象转换成json对象，去除无用信息
  //    */
  //   let reply = {};
  //   reply.code = message.getCode();
  //   reply.key = message.getKey();
  //   reply.message = message.getMessage();
  //   reply.timestamp = message.getTimestamp();
  //   reply.data = {};
  //
  //   /**
  //    * 注意，遍历map这里的参数 value在前key在后
  //    */
  //   message.getDataMap().forEach(function (v, k) {
  //     reply.data[k] = v;
  //   });
  //
  //   window.onReplyReceived(reply);
  // }
}

CIMPushManager.innerOnConnectionClosed = function (e) {
  if (!manualStop) {
    let time = Math.floor(Math.random() * (30 - 15 + 1) + 15)
    setTimeout(function () {
      CIMPushManager.connect()
    }, time)
  }
}

CIMPushManager.sendRequest = function (body) {
  socket.send(JSON.stringify(body))
}

function onInterceptMessageReceived (message) {
  // this.$notification.success({
  //   message: '欢迎',
  //   description: `${message}，欢迎回来`
  // })
  /*
   *被强制下线之后，不再继续连接服务端
   */
  console.log(message)
  if (message.action == ACTION_999) {
    manualStop = true
  }
  /*
   *收到消息后，将消息发送给页面
   */
  if (window.onMessageReceived instanceof Function && message.action==MESSAGE) {
    window.onMessageReceived(message)
  }
}

function getBrowser () {
  let explorer = window.navigator.userAgent.toLowerCase()
  if (explorer.indexOf('msie') >= 0) {
    let ver = explorer.match(/msie ([\d.]+)/)[1]
    return { name: 'IE', version: ver }
  } else if (explorer.indexOf('firefox') >= 0) {
    let ver = explorer.match(/firefox\/([\d.]+)/)[1]
    return { name: 'Firefox', version: ver }
  } else if (explorer.indexOf('chrome') >= 0) {
    let ver = explorer.match(/chrome\/([\d.]+)/)[1]
    return { name: 'Chrome', version: ver }
  } else if (explorer.indexOf('opera') >= 0) {
    let ver = explorer.match(/opera.([\d.]+)/)[1]
    return { name: 'Opera', version: ver }
  } else if (explorer.indexOf('Safari') >= 0) {
    let ver = explorer.match(/version\/([\d.]+)/)[1]
    return { name: 'Safari', version: ver }
  }
  return { name: 'Other', version: '1.0.0' }
}

function generateUUID () {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid.replace(/-/g, '')
}

export {
  onConnect,
  onbindAccount
}
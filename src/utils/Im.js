export default class InitIm {
  constructor(options) {
    this.user = null
    this.appId = options.appId
    this.appKey = options.appKey
    this.appSecret = options.appSecret
    this.appAccount = options.appAccount
    this.message = null
    // 登录成功的回调函数
    this.success = options.success
    // 登录失败的回调函数
    this.error = options.error
    // 接收推送消息
    this.receiveP2PMsgResult = options.receiveP2PMsgResult
    this.init()
  }
  // 初始化
  init() {
    this.user = new MIMCUser(this.appId, this.appAccount)
    this.user.registerFetchToken(this.fetchMIMCToken.bind(this)) //获取token回调
    this.user.registerStatusChange(this.statusChange.bind(this)) //登录结果回调
    this.user.registerP2PMsgHandler(this.receiveP2PMsg.bind(this)) //接收单聊消息回调
    this.user.login()
  }
  // 安全认证登录成功后触发
  statusChange(bindResult, errType, errReason, errDesc) {
    if (bindResult) {
      this.success('登录成功')
    } else {
      this.error({
        msg: '登录失败',
        errType,
        errReason,
        errDesc
      })
    }
  }
  // 获取token
  fetchMIMCToken() {
    let sendData = { appId: this.appId, appKey: this.appKey, appSecret: this.appSecret, appAccount: this.appAccount }
    return this.httpRequest('https://mimc.chat.xiaomi.net/api/account/token', sendData)
  }
  httpRequest(url, data) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, false)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(JSON.stringify(data))

    return JSON.parse(xhr.response)
  }
  // 开启接收消息
  startRegisterStatusChange() {}
  // 接收消息回调
  receiveP2PMsg(P2PMsg) {
    this.receiveP2PMsgResult({
      content: Base64.decode(JSON.parse(P2PMsg.getPayload()).payload)
    })
  }
  // receiveP2PMsg(P2PMsg) {
  //   console.log('1', Base64.decode(JSON.parse(P2PMsg.getPayload()).payload))
  //   return { content: Base64.decode(JSON.parse(P2PMsg.getPayload()).payload) }
  // }
}

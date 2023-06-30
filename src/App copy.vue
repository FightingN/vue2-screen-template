<template>
  <div id="app">
    <button @click="test">登录</button>
    <div>消息推送内容：{{ message }}</div>
    <router-view />
  </div>
</template>
<script>
import { setWaterMark } from '@/utils/common.js'
import { fetchMIMCToken } from '@/api/im.js'
export default {
  name: 'APP',
  data() {
    return {
      appId: '2882303761520141574',
      appKey: '5352014189574',
      appSecret: 'L2wAdg/bgbCTfZjtN3IXaQ==',
      appAccount: 'test_1386',
      message: '无',
      resToken: null,
      user: null
    }
  },
  created() {
    console.log('app==========2222')
  },
  mounted() {
    console.log('app==========')
    // this.test1()
    this.test()
  },
  methods: {
    test1() {
      setWaterMark('张晓宁', '1111111')
    },
    test() {
      this.user = new MIMCUser(this.appId, this.appAccount)
      this.user.registerFetchToken(this.fetchMIMCToken) //获取token回调
      this.user.registerStatusChange(this.statusChange) //登录结果回调
      this.user.registerP2PMsgHandler(this.receiveP2PMsg) //接收单聊消息回调
      this.user.login()
    },
    receiveP2PMsg(P2PMsg) {
      console.log('2', Base64.decode(JSON.parse(P2PMsg.getPayload()).payload))
    },
    fetchMIMCToken() {
      let sendData = { appId: this.appId, appKey: this.appKey, appSecret: this.appSecret, appAccount: this.appAccount }
      return this.httpRequest('https://mimc.chat.xiaomi.net/api/account/token', sendData)
    },
    statusChange(bindResult, errType, errReason, errDesc) {
      if (bindResult) {
        this.message = 'login succeed'
      } else {
        console.log(errType, errReason, errDesc)
        this.message = 'login failed'
      }
    },
    httpRequest(url, data) {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url, false)
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.send(JSON.stringify(data))

      return JSON.parse(xhr.response)
    }
  }
}
</script>

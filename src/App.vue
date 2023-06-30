<template>
  <div id="app">
    <!-- <button @click='InitIm'>登录</button>
    <div>消息推送内容：{{ message }}</div> -->
    <router-view />
  </div>
</template>
<script>
import { setWaterMark } from '@/utils/common.js'
import InitIm from '@/utils/Im.js'
import { getIMSDK } from '@/utils/config.js'
export default {
  name: 'APP',
  data() {
    return {
      user: null,
      message: ''
    }
  },
  created() {
    this.test1()
  },
  methods: {
    test1() {
      setWaterMark('张晓宁', '1111111')
    },
    InitIm() {
      this.user = new InitIm({
        appId: getIMSDK().appId,
        appKey: getIMSDK().appKey,
        appSecret: getIMSDK().appSecret,
        appAccount: getIMSDK().appAccount,
        success: res => {
          console.log(res)
        },
        error: function(err) {
          console.log(err)
          // 登录失败
        },
        // 接收推送消息
        receiveP2PMsgResult: res => {
          console.log('res----receiveP2PMsgResult', JSON.parse(res.content))
          this.message = JSON.parse(res.content).title
        }
      })
    }
  }
}
</script>

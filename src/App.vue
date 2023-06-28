<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { setWaterMark } from '@/utils/common.js'
export default {
  name: 'APP',
  mounted() {
    this.test()
  },
  methods: {
    test() {
      setWaterMark('张晓宁', '1111111')
    }
  }
}
</script>

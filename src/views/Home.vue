<template>
  <div class="home"></div>
</template>

<script>
import { setWaterMark } from '@/utils/common.js'
export default {
  name: 'Home',
  mounted() {
    this.test()
  },
  methods: {
    test() {
      // setWaterMark('张晓宁', '1111111')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  box-sizing: border-box;
  min-width: 1200px;
  height: 100%;
  // background: #eee;
  border: 1px solid red;
}
</style>

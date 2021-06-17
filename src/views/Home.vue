<template>
  <div class="home">
    <screen-text></screen-text>
    <EchartsText></EchartsText>
    <ScreenDropdownMenu></ScreenDropdownMenu>
  </div>
</template>

<script>
import EchartsText from './EchartsText'
export default {
  name: 'Home',
  components: { EchartsText }
}
</script>
<style lang="scss" scoped>
.home {
  box-sizing: border-box;
  width: 1920px;
  height: 100vh;
  background: #eee;
}
</style>

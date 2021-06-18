<template>
  <!-- <div class="home"> -->
  <scale-box>
    <screen-text></screen-text>
    <EchartsText></EchartsText>
    <ScreenDropdownMenu></ScreenDropdownMenu>
    <div class="text"></div>
  </scale-box>
  <!-- </div> -->
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
  background: #eee;
}
.text {
  width: 1920px;
  height: 100px;
  border: 1px solid red;
  box-sizing: border-box;
}
</style>

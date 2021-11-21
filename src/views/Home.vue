<template>
  <div class="home">
    <screen-text></screen-text>
    <EchartsText></EchartsText>
    <div class="height1">
      <ScreenDropdownMenu></ScreenDropdownMenu>
    </div>
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
  height: 100%;
  background: #eee;
  .height1 {
    width: 100%;
    height: 50px;
    border: 1px solid red;
  }
}
</style>

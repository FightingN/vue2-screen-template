<template>
  <div class="echarts-text">
    <screen-echarts-frame
      @myChartMethod="chartManageBarMethod"
      ref="chartManageBar"
    ></screen-echarts-frame>
  </div>
</template>
<script>
import { chartOptionPie } from './options.js'
import { debounce } from 'utils/common'

export default {
  name: 'EchartsText',
  data () {
    return {
      myChartBar: null
    }
  },
  mounted () {
    window.addEventListener('resize', debounce(this.resizeEcharts))
  },
  methods: {
    chartManageBarMethod (myChart) {
      this.myChartBar = myChart
      this.$refs.chartManageBar.clear()
      // 后期数据要更新时,直接调用这句
      this.myChartBar.setOption(chartOptionPie())
    },
    resizeEcharts () {
      if (this.myChartBar) {
        this.myChartBar.resize()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts-text {
  width: 500px;
  height: 30%;
  border: 1px solid red;
}
</style>

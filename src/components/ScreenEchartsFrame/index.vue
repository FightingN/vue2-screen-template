<template>
  <div class="screen-echarts-frame" ref="ScreenEchartsFrame"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ScreenEchartsFrame',
  data () {
    return {
      myChart: ''
    }
  },
  props: {
    chartMethod: {
      type: Function
    }
  },
  mounted () {
    this.initChart()
    window.onresize = () => {
      this.myChart.resize()
    }
  },
  beforeDestroy () {
    // 销毁echarts实例对象
    if (this.myChart) this.myChart.dispose()
  },
  watch: {},
  methods: {
    initChart () {
      this.$nextTick(() => {
        const dom = this.$refs.ScreenEchartsFrame
        this.myChart = echarts.init(dom)
        // this.myChart.setOption(this.chartMethod())
        this.$emit('myChartMethod', this.myChart)
      })
    },
    // 配置option
    setOption (option) {
      this.myChart.setOption(option)
    },
    // 获取option
    getOption () {
      if (this.myChart) {
        return this.myChart.getOption()
      } else {
        return null
      }
    },
    //
    resize () {
      if (this.myChart) {
        this.myChart.resize()
      }
    },
    clear () {
      if (this.myChart) {
        this.myChart.clear()
      }
    },
    showLoading () {
      if (this.myChart) {
        this.$nextTick(() => {
          this.myChart.showLoading({
            text: '',
            color: '#29cdff',
            textColor: '#29cdff',
            maskColor: 'rgba(255, 255, 255, 0)',
            zlevel: 0
          })
        })
      }
    },
    hideLoading () {
      if (this.myChart) {
        debugger
        this.myChart.hideLoading()
      }
    },
    // 启动动画时使用
    tooltipAnimate (chart, length) {
      // 清除上一次动画
      this.timeTicket && clearInterval(this.timeTicket)
      const count = 0
      // 启动动画
      this._action(chart, count, length)
      chart && // 移除动画
        chart.on('mouseover', params => {
          this._cleanAction(chart, params)
        })
      // 重写启动动画
      chart &&
        chart.on('mouseout', () => {
          this._action(chart, count, length)
        })
    },
    // tooltip动画action
    _action (chart, count, length) {
      this.timeTicket && clearInterval(this.timeTicket)
      this.timeTicket = setInterval(() => {
        if (!chart) {
          clearInterval(this.timeTicket)
          return
        }
        chart &&
          chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
        chart &&
          chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: count % length
          })
        chart &&
          chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: count % length
          })
        count++
      }, 1000 * 3)
    },
    _cleanAction (chart, params) {
      this.timeTicket && clearInterval(this.timeTicket)
      if (!chart) {
        clearInterval(this.timeTicket)
        return
      }
      chart &&
        chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })
      chart &&
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: params.dataIndex
        })
      chart &&
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: params.dataIndex
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-echarts-frame {
  width: 100%;
  height: 100%;
}
</style>

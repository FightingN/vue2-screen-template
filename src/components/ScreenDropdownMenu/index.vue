<template>
  <div
    :style="{ width: width, height: height }"
    ref="screenDropdownMenu"
    class="screen-dropdown-menu"
  >
    <div class="screen-dropdown-menu-frame" @click="onVisibleChange">
      <div class="select-label">{{ selectedLabel }}</div>
      <svg-icon icon-class="bottom-sword" fill="#fff"> </svg-icon>
    </div>
    <div
      class="screen-dropdown-menu-list"
      :style="{
        height: dropdownMenuVisible
          ? dataList.length > 4
            ? '260px'
            : `${dataList.length * 50 + 10}px`
          : '0px',
        opacity: dropdownMenuVisible ? '1' : '0',
        '--top': top
      }"
    >
      <div
        class="screen-dropdown-menu-list-border"
        :style="{ overflowY: dataList.length > 5 ? 'auto' : 'hidden' }"
      >
        <div
          :class="[
            'screen-dropdown-menu-list-item',
            item.select ? 'screen-dropdown-menu-list-item-active' : ''
          ]"
          @click.stop="onChooseItem(item)"
          v-for="item in dataList"
          :key="item.value"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="screen-dropdown-menu-list-arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenDropdownMenu',
  data () {
    return {
      dataList: [],
      dropdownMenuVisible: false,
      selectedLabel: ''
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '30px'
    },
    menuList: {
      type: Array,
      default: () => {
        return [
          {
            label: '全部',
            select: true,
            value: '1'
          },
          {
            label: '黄金糕',
            select: false,
            value: '2'
          },
          {
            label: '双皮奶',
            select: false,
            value: '3'
          },
          {
            label: '蚵仔煎',
            select: false,
            value: '4'
          },
          {
            label: '龙须面',
            select: false,
            value: '5'
          },
          {
            label: '北京烤鸭',
            select: false,
            value: '6'
          }
        ]
      }
    },
    defaultSelected: {
      type: [String, Number],
      default: '1'
    },
    top: {
      type: String,
      default: '40px'
    }
  },
  watch: {
    // 下拉菜单列表数据
    menuList: {
      immediate: true,
      handler: function (value) {
        if (value.length > 0) {
          value.forEach(item => {
            item.select = false
          })
          this.dataList = value
          this.selectedLabel = this.dataList[0].label
        }
      }
    },
    // 默认选中item
    defaultSelected: {
      immediate: true,
      handler: function (value) {
        this.dataList.forEach(item => {
          if (item.value === value) {
            item.select = true
            this.selectedLabel = item.label
          } else {
            item.select = false
          }
        })
      }
    },
    // 下拉菜单显示隐藏
    dropdownMenuVisible: {
      immediate: true,
      handler: function (value) {
        this.dropdownMenuVisible = value
      }
    }
  },
  mounted () {
    window.addEventListener('click', e => {
      if (
        this.$refs.screenDropdownMenu &&
        !this.$refs.screenDropdownMenu.contains(e.target)
      ) {
        this.dropdownMenuVisible = false
      }
    })
  },
  methods: {
    onChooseItem (item) {
      this.dataList.forEach(data => {
        if (data.value === item.value) {
          data.select = true
          this.selectedLabel = item.label
        } else {
          data.select = false
        }
      })
      this.$emit('onChooseItem', item)
      this.dropdownMenuVisible = false
    },
    onVisibleChange () {
      this.dropdownMenuVisible = !this.dropdownMenuVisible
      this.$emit('onVisibleChange', this.dropdownMenuVisible)
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-dropdown-menu {
  position: relative;
  .screen-dropdown-menu-frame {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #4c5c9a;
    border-radius: 3px;
    // color: #606266;
    color: #2bccff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px;
  }
  .screen-dropdown-menu-list {
    width: 100%;
    position: absolute;
    box-shadow: 0 2px 12px 0 #5c7bc7;
    background: #061a3b;
    z-index: 100;
    left: 0;
    top: var(--top);
    border-radius: 4px;
    max-height: 260px;
    transition: height 0.1s linear, opacity 0.1s linear;
    &-border {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 10px 0 0;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #2bccff;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #061836;
      }
    }
    &-item {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: left;
      color: #fff;
      font-size: 0.15rem;
      box-sizing: border-box;
      padding: 0 12px;
      &:hover {
        color: #2bccff;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .screen-dropdown-menu-list-item-active {
      color: #2bccff;
      background: rgba(255, 255, 255, 0.1);
    }
    &-arrow {
      position: absolute;
      width: 0px;
      height: 0px;
      top: -12px;
      left: 35px;
      border: 6px solid transparent;
      border-bottom: 6px solid #fff;
    }
  }
  .select-label {
    font-size: 0.175rem;
  }
}
</style>

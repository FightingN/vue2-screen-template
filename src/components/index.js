import Vue from "vue";

const components = require.context("components/", true, /\.vue$/);
components.keys().forEach(filename => {
  // filename:./fabric/fabric-index.vue 先把./替换成空，再把.vue替换成空 用/分割成数组
  const arr = filename
    .replace(/\.\//, "")
    .replace(/\.vue$/, "")
    .split("/");
  // 定义组件的名字
  const componentName = arr[arr.length - 2];
  // 找到默认的组件
  const componentConfig = components(filename).default;
  // 注册
  Vue.component(componentName, componentConfig);
});

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svg-icon/svg", false, /\.svg$/);
requireAll(req);

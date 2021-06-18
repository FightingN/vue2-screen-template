const path = require("path");

function join(dir) {
  return path.join(__dirname, dir);
}
function diffOutputDir() {
  if (process.env.VUE_APP_SCREEN === "prod") {
    return "screen";
  } else if (process.env.VUE_APP_SCREEN === "dev") {
    return "dist";
  }
}

module.exports = {
  // 资源根路径
  publicPath: "./",
  // 打包根路径
  outputDir: diffOutputDir(),
  lintOnSave: false,
  // 调整 webpack 配置
  chainWebpack: config => {
    config.resolve.alias
      .set("views", join("src/views"))
      .set("utils", join("src/utils"))
      .set("components", join("src/components"));
    config.module
      .rule("svg")
      .include.add(join("src/components/svg-icon/svg"))
      .end()
      .test(/\.svg$/)
      .use("file-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
  // 调整 webpack 配置
  configureWebpack: config => {
    config.externals = {
      echarts: "echarts"
    };
  },
  // css相关配置
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false
    // css预设器配置项
    // loaderOptions: {
    //   css: {},
    //   postcss: {
    //     plugins: [
    //       //remUnit这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。
    //       //假如设计图给的宽度是1920，我们通常就会把remUnit设置为80，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。
    //       // 这里我是按照24等分来划分的,大家也可以按照10等分的话就是192，但是一定记得要去改lib-flexible源码才可以
    //       require("postcss-px2rem")({
    //         remUnit: 80
    //       })
    //     ]
    //   }
    // }
  }
};

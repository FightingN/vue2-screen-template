const path = require("path");

function join(dir) {
  return path.join(__dirname, dir);
}
function diffOutputDir() {
  if (process.env.VUE_APP_SCREEN === "prod") {
    return "web";
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
      .set("style", join("src/style"))
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
    // 打包结果分析
    if (process.env.NODE_ENV === "development") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
  // css相关配置
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false
  }
};

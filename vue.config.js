const path = require("path");
const version = new Date().getTime();
function join(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 资源根路径
  publicPath: `/${process.env.VUE_APP_PACKAGENAME}/`,
  // 打包根路径
  outputDir: process.env.VUE_APP_PACKAGENAME,

  // 静态资源文件夹名
  assetsDir: "static",

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
  // js分离打包路径
  configureWebpack: config => {
    config.output.filename = `static/js/[name].${process.env.NODE_ENV}.${process.env.VUE_APP_VERSION}.${version}.js`;
    config.output.chunkFilename = `static/js/[name].${process.env.NODE_ENV}.${process.env.VUE_APP_VERSION}.${version}.js`;
  },
  // css相关配置
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    extract: {
      ignoreOrder: true,
      // 打包后css文件名称添加时间戳
      filename: `css/[name].${process.env.NODE_ENV}.${process.env.VUE_APP_VERSION}.${version}.css`,
      chunkFilename: `css/chunk.[id].${process.env.NODE_ENV}.${process.env.VUE_APP_VERSION}.${version}.css`
    }
  }
};

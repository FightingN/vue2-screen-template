const path = require("path");

function join(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  // 调整 webpack 配置
  chainWebpack: config => {
    config.resolve.alias
      .set("views", join("src/views"))
      .set("utils", join("src/utils"))
      .set("components", join("src/components"));
  }
};

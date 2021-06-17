export default {
  apiUrl: getApiUrl() // 获取接口的baseURL
};
function getApiUrl() {
  // 需要区分 客户端生产环境、web端生产环境、本地开发环境
  if (process.env.NODE_ENV === "development") {
    return "测试环境接口地址";
  } else if (
    process.env.VUE_APP_SCREEN === "prod" ||
    process.env.NODE_ENV === "production"
  ) {
    return "正式环境接口";
  } else {
    return "测试环境接口地址";
  }
}

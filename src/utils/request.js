import axios from "axios";
// import config from "./config";
// import { Message } from "element-ui";
// import { getCookie } from "utils/cookie";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60 * 1000
});

// 添加一个请求拦截器
request.interceptors.request.use(
  config => {
    // if (getCookie("token")) {
    //   config.headers.Authorization = `Bearer ${getCookie("token")}`;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 添加一个响应拦截器
request.interceptors.response.use(
  response => {
    if (
      (response.data.code === 0 && response.data.msg === "success") ||
      (response.data.code === 200 && response.data.msg === "success") ||
      (response.data.status === 200 && response.data.message === "success")
    ) {
      return response.data;
    } else {
      if (response.data.code === 401) {
        // Message({
        //   type: "error",
        //   message: response.data.msg
        // });
        // setTimeout(() => {
        //   window.localStorage.removeItem("token");
        //   // router.push({ path: '/login' })
        // }, 400);
        return Promise.reject(new Error("error"));
      } else {
        return Promise.reject(response.data);
      }
    }
  },
  err => {
    // window.localStorage.removeItem("token");
    return Promise.reject(err);
  }
);

export default request;

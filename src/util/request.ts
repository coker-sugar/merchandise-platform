import axios, { AxiosError, AxiosResponse } from "axios";
// 获取个人信息，主要是token

// 创建新的axios实例
const service = axios.create({
  // 公共接口
  // baseURL:'http://127.0.0.1:4523/m1/3169753-0-default/index',
  baseURL: "https://f271b81c2194a437a9b3b3b78335bc95.pty.oscollege.net",
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
    // 每次发送请求之前判断pinia中是否存在token,如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况

    const token = JSON.parse(localStorage.getItem("user") || "{}").token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // alert("加载中...")

    // json格式
    if (config.headers["Content-Type"] !== "multipart/form-data") {
      config.data = JSON.stringify(config.data);
    }

    return config;
  },
  (error: AxiosError) => {
    // 请求错误，这里可以用全局提示框进行提示
    alert("请求错误，请稍后再试");
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      if (data.code === 200) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    // 提示错误信息
    if (JSON.stringify(error).includes("Network Error")) {
      alert("网络超时");
    }

    // 根据响应的错误状态码，做不同的处理
    if (response && response.data && response.data === 400) {
      alert("请求失败");
    } else if (response && response.data && response.data === 401) {
      alert("未认证");
    } else if (response && response.data && response.data === 403) {
      alert("访问被拒绝");
    } else {
      alert("服务器错误");
    }

    return Promise.reject(error);
  }
);

export default service;

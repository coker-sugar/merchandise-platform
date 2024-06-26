import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';


// 创建新的axios实例
const service = axios.create({
  // 公共接口
  baseURL:'https://f271b81c2194a437a9b3b3b78335bc95.pty.oscollege.net',
  timeout: 1000 * 1000000,
  withCredentials: true,
})

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('user') || "{}").token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.headers["Content-Type"] !== "multipart/form-data") {
      config.data = JSON.stringify(config.data);
    }

    return config;
  },

  (error: AxiosError) => {
    // 请求错误
    message.error(error.message);
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      // <<<<<<< HEAD
      //       if (data.code == 200) {
      // =======
      if (data.code === 200) {
        // >>>>>>> db6737b57a0bb6cb54946b29c0a59a5b82aea8c4
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    // 提示错误信息
    // <<<<<<< HEAD
    if (JSON.stringify(error).includes('Network Error')) {
      message.error('网络连接错误');
      // =======
      //     if (JSON.stringify(error).includes("Network Error")) {
      //       alert("网络超时");
      // >>>>>>> db6737b57a0bb6cb54946b29c0a59a5b82aea8c4
    }

    // 根据响应的错误状态码，做不同的处理
    if (response && response.data && response.data === 400) {
      // <<<<<<< HEAD
      message.error('请求失败');
    } else if (response && response.data && response.data === 401) {
      message.error('未认证');
    } else if (response && response.data && response.data === 403) {
      message.error('访问被拒绝');
    } else {
      message.error('服务器错误');
      // =======
      //       alert("请求失败");
      //     } else if (response && response.data && response.data === 401) {
      //       alert("未认证");
      //     } else if (response && response.data && response.data === 403) {
      //       alert("访问被拒绝");
      //     } else {
      //       alert("服务器错误");
      // >>>>>>> db6737b57a0bb6cb54946b29c0a59a5b82aea8c4
    }

    return Promise.reject(error);
  }
);

export default service;

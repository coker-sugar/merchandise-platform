import request from './request';
import { AxiosRequestConfig } from 'axios';

/**
 * 网络请求响应格式，T 是具体的接口返回类型数据
 */
interface CustomSuccessData<T> {
  code?: number;
  msg?: string;
  message?: string;
  data: T;
  [keys: string]: any;
}

const get = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'get',
    url, 
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return request(config);
};


const post = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'post',
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return request(config);
};


const patch = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'patch',
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return request(config);
};

const remove = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'delete',
    url,
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return request(config);
};

// 包裹请求方法的容器,使用 http 统一调用
const http = {
  get,
  post,
  patch,
  remove,
};

export default http;
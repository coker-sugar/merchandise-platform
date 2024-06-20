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

/**
 * @description: 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const get = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'get', // `method` 是创建请求时使用的方法
    url, // `url` 是用于请求的服务器 URL
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return request(config);
};

/**
 * @description: 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
// const post = <T>(
//   url: string,
//   data?: string | object,
//   config?: AxiosRequestConfig
// ): Promise<CustomSuccessData<T>> => {
//   config = {
//     method: 'post',
//     url,
//     ...config,
//   };
//   if (data) {
//     config.data = data;
//   }
//   return request(config);
// };


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

  if (data && typeof data === 'object') {
    // 将 data 对象转换为 URL 编码的字符串
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      if (typeof value === 'string') {
        params.append(key, value.replace(/"/g, '')); // 去掉双引号
      } else {
        params.append(key, String(value));
      }
    });
    config.data = params.toString();
  } else if (data) {
    if (typeof data === 'string') {
      config.data = data.replace(/"/g, ''); // 去掉双引号
    } else {
      config.data = data;
    }
  }

  if (config.headers) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  return request(config);
};


/**
 * @description: 封装patch请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
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

/**
 * @description: 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
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
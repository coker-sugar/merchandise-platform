import { loginDataType, userInfoType, remeberDataType, emailType } from '../types/user';
import http from '../util/request'
// api接口 - 此处用了统一保存接口url路径
const api = {
  login: "/auth/login", 
  register: "/auth/register", 
  userInfo: "/api/user/get_userinfo", 
  remeber: "/auth/forgot",
  emailCode: '/auth/sendEmail',
  exit: '/auth/logout'
};
export function postLoginAPI(data: loginDataType) {
  return http.post(api.login, {
    username: data.username,
    password: data.password
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function postRegisterAPI(data: loginDataType) {
  return http.post(api.register, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getUserInfoAPI() {
  return http.get<userInfoType>(api.userInfo);
}

export function postRemeberAPI(data: remeberDataType) {
  return http.post(api.remeber, {
    email: data.email,
    password: data.password,
    code: data.code
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  );
}

export function getEmailCode(data: emailType) {
  return http.get(api.emailCode, { params: data });
}

export function getExit(token: string) {
  return http.get(api.exit, { params: token });
}
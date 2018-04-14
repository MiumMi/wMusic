/* eslint-disable */
// import { encrypt } from '../lib/params.js';
/* eslint func-names: ["error", "never"] */
export const axiosHTTPConfig = function (data) {
  return data;
  // if (data.method == 'get' || data.method == 'delete') {
  //   // console.log('data.params', data.params)
  //   encrypt.getParams(data.params);
  //   return data;
  // } else {
  //   data.data = encrypt.getParams(data.data);
  //   return data;
  // }
};
/* eslint func-names: ["error", "never"] */
export const axiosHTTPError = function (error) {
  // 当出现请求错误時
  return Promise.reject(error);
};

export const axiosResConfig = function(response) {
  return JSON.parse(response.data);
}

export const axiosResError = function(error) {
  return Promise.reject(error);
}
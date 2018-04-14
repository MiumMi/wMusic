/* eslint-disable */
const qs = require('qs')
let headers = {}
let type = window.sessionStorage.getItem('requestType')
if (type === 'json') {
  headers = {
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary1UL9BmiebbAvR0XI'
  }
} else {
  headers = {
    'Content-Type': 'application/x-www-form-urlencodedcharset=UTF-8'
  }
}
let ajaxnumber = 0
export const axiosDefault = {
  baseURL: window.location.protocol + '//' + window.location.href.split('/')[2] + '/',
  // baseURL: 'http://180.166.172.126:8080/',
  headers: headers,
  withCredentials: false,
  /* eslint func-names: ["error", "never"] */
  transformRequest: [function (data) {
    ajaxnumber++
    if(window.sessionStorage.getItem('isImg') == '1'){
      window.sessionStorage.setItem('isImg', '0');
      return data
    } else {
      return qs.stringify(data)
    }
  }],
  /* eslint func-names: ["error", "never"] */
  transformResponse: [function (data) {
    ajaxnumber--
    return data
  }]
}


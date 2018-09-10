import axios from 'axios'
import cookie from 'component-cookie'
import gateway from '../_gateway.config'

// function getBaseUrl (apiRoot) {
//   if (~apiRoot.indexOf('_account')) {
//     return apiRoot.replace('_account', account)
//   }
//   if (~apiRoot.indexOf('_course')) {
//     return apiRoot.replace('_course', course)
//   }
//   if (~apiRoot.indexOf('_teacher')) {
//     return apiRoot.replace('_teacher', teacher)
//   }
//   if (~apiRoot.indexOf('_signalling')) {
//     return apiRoot.replace('_signalling', signalling)
//   }
//   if (~apiRoot.indexOf('_link')) {
//     return apiRoot.replace('_link', link)
//   }
//   return `${account}/api${apiRoot}`
// }

export
function callApi (apiRoot = '/') {

  var obj = {}
    // var token = cookie('abc-token') || decodeURIComponent(getQueryString('authToken'))
    obj = axios.create({
      baseURL: apiRoot,
      timeout: 10000,
      // headers: { 'Authorization': token }
      headers: {'content-type': 'application/x-www-form-urlencoded'} // php接口的post上传你数组使用此类型
      // headers: {'content-type': 'application/json;charset=UTF-8' } // nodejs接口的post上传你数组使用此类型
    })

  obj.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  obj.interceptors.response.use(res => {
    // console.log(res)

    // 如果请求有误抛出异常
    if (res.data
      && res.data.original
      && res.data.original.status
      && res.data.original.status == 'fail') {

      throw new Error(res.data.original.msg);
    }

    return res.data
  }, err => {

    let error = err
    return Promise.reject(error)

  })

  return obj
}

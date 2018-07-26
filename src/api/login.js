import { callApi } from './_util'

const axios = callApi('https://tpdoc.cn')
// const axios = callApi('http://127.0.0.1/work-myProject/topay_api_new')

// 用户注册接口
export function upBaseInfo (data) {
  return axios.post(`/api/person_page/add_base_info`, data)
}

// 用户登录接口
export function login (data) {
  return axios.post(`/account/personLogin`, data)
}


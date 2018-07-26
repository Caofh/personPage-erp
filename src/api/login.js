import { callApi } from './_util'

const axios = callApi('https://tpdoc.cn')
// const axios = callApi('http://127.0.0.1/work-myProject/topay_api_new')

// 上传图片
export function upBaseInfo (data) {
  return axios.post(`/api/person_page/add_base_info`, data)
}


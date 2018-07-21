import { callApi } from './_util'

const axios = callApi('https://tpdoc.cn')
// const axios = callApi('http://127.0.0.1/work-myProject/topay_api_new')

// 上传图片
export function uploadImg (data, file_type) {
  return axios.post(`/api/common/upload_files?file_type=${file_type}`, data)
}

// 上传裁剪后的base64图片流
export function uploadBase64Img (data) {
  return axios.post(`/api/common/base64_change`, data)
}

// 上传专题资源
export function updateResource (data) {
  return axios.post(`/api/person_page/add_data`, data)
}

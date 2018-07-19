import { callApi } from './_util'

// const axios = callApi('https://tpdoc.cn')
const axios = callApi('http://127.0.0.1/work-myProject/topay_api_new')

export function uploadImg (data, file_type) {
  return axios.post(`/api/common/upload_files?file_type=${file_type}`, data)
}

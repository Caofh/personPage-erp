import { login } from '../../../api/login'
import cookie from 'component-cookie'

const actions = {
  // 获取用户基本信息
  async init ({dispatch, commit}, payload) {

    const path = payload.name
    const token = cookie('person-token')

    // console.log(path)
    // console.log(token)

    if (token) {
      const data = {
        token: token
      }

      const dataList = await login(data)

      // 用户基本信息
      const baseInfo = dataList.original.data[0] || ''

      commit('setBaseInfo', baseInfo)

    }

  }

}


export default actions

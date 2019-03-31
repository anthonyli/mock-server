import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  isLogin: !!localStorage.getItem('token'),
  userInfo: {
    userName: localStorage.getItem('userName'),
    userNickName: localStorage.getItem('userNickName'),
    companyName: localStorage.getItem('companyName')
  },
  list: []
})

export default {
  state: initialState,
  reducers: {
    isLogin: (state, payload) => {
      return state.set('isLogin', payload)
    },
    setUserName: (state, payload) => {
      return state.setIn(['userInfo', 'userName'], payload)
    },
    setUserNickName: (state, payload) => {
      return state.setIn(['userInfo', 'userNickName'], payload)
    },
    setUserList: (state, payload) => {
      return state.set('list', im.fromJS(payload))
    },
    setcompanyName: (state, payload) => {
      return state.setIn(['userInfo', 'setcompanyName'], payload)
    }
  },
  effects: {
    login(data, rootState) {
      return axios.post('/user/login', data)
    },
    async getUserList(data, rootState) {
      const list = await axios.get('/user/list')
      this.setUserList(list)
    },
    logout(data, rootState) {
      localStorage.removeItem('token')
      this.isLogin(false)
    }
  }
}

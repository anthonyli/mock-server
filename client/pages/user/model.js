import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  isLogin: !!localStorage.getItem('_m_token'),
  defaultActiveKey: '1',
  list: []
})

export default {
  state: initialState,
  reducers: {
    isLogin: (state, payload) => {
      return state.set('isLogin', payload)
    },
    setActiveKey: (state, payload) => {
      return state.set('defaultActiveKey', payload)
    },
    setUserList: (state, payload) => {
      return state.set('list', im.fromJS(payload))
    }
  },
  effects: {
    login(data, rootState) {
      return axios.post('/user/login', data)
    },
    register(data, rootState) {
      return axios.post('/user/register', data)
    },
    async getUserList(data, rootState) {
      const list = await axios.get('/user/list')
      this.setUserList(list)
    },
    logout(data, rootState) {
      localStorage.removeItem('_m_token')
      localStorage.removeItem('activeMenu')
      this.isLogin(false)
    }
  }
}

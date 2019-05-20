import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  defaultActiveKey: '1'
})

export default {
  state: initialState,
  reducers: {
    setActiveKey: (state, payload) => {
      return state.set('defaultActiveKey', payload)
    }
  },
  effects: {
    login(data, rootState) {
      return axios.post('/user/login', data)
    },
    register(data, rootState) {
      return axios.post('/user/register', data)
    },
    logout(data, rootState) {
      localStorage.removeItem('_m_token')
      localStorage.removeItem('activeMenu')
    }
  }
}

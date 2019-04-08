import im from 'immutable'
import axios from 'common/axios'

const getDefaultParams = () => {
  return {
    size: 10,
    page: 1
  }
}

const initialState = im.fromJS({
  list: {
    loading: false,
    params: getDefaultParams(),
    defaultParams: getDefaultParams(),
    dataSource: []
  }
})

export default {
  state: initialState,
  reducers: {
    list: (state, payload) => {
      return state.update('list', list =>
        list.set('dataSource', im.fromJS(payload)).set('loading', false)
      )
    },
    loading: (state, payload) => {
      return state.update('list', list => list.set('loading', true))
    },
    setParams: (state, payload) => {
      return state.update('list', list =>
        list.set('params', im.fromJS(payload)).set('loading', false)
      )
    }
  },
  effects: {
    login(data, rootState) {
      return axios.post('/user/login', data)
    },
    async getUserList(data, rootState) {
      const list = await axios.get('/user/list')
      this.setUserList(list)
    }
  }
}

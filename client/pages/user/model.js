import im from 'immutable'
import axios from 'common/axios'

const getDefaultParams = () => {
  return {
    pageSize: 10,
    pageIndex: 1
  }
}

const initialState = im.fromJS({
  list: {
    loading: false,
    params: getDefaultParams(),
    defaultParams: getDefaultParams(),
    dataSource: []
  },
  profile: {}
})

export default {
  state: initialState,
  reducers: {
    list: (state, payload) => {
      return state.update('list', list =>
        list.set('dataSource', im.fromJS(payload)).set('loading', false)
      )
    },
    setParams: (state, payload) => {
      return state.update('list', list =>
        list.set('params', im.fromJS(payload)).set('loading', false)
      )
    },
    loading: (state, payload) => {
      return state.update('list', list => list.set('loading', true))
    },
    setUserList: (state, payload) => {
      return state.set('list', im.fromJS(payload))
    },
    setProfile: (state, payload) => {
      return state.set('profile', im.fromJS(payload))
    }
  },
  effects: {
    async getUserList(params, rootState) {
      let newParams = Object.assign(
        rootState.project.getIn(['list', 'defaultParams']).toJS(),
        params
      )
      this.loading()
      const data = await axios.get('/user/list', { params: newParams })
      this.list(data)
      this.setParams(newParams)
    },
    async getFindUser(params, rootState) {
      const data = await axios.get('/user/findone')
      this.setProfile(data)
    },
    deleteUser(params, rootState) {
      return axios.post('/user/delete', { id: params })
    }
  }
}

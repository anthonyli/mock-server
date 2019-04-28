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
  doclist: {
    loading: false,
    params: getDefaultParams(),
    defaultParams: getDefaultParams(),
    dataSource: []
  },
  editData: {}
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
    doclist: (state, payload) => {
      return state.update('doclist', list =>
        list.set('dataSource', im.fromJS(payload)).set('loading', false)
      )
    },
    loadingdoc: (state, payload) => {
      return state.update('doclist', list => list.set('loading', true))
    },
    setParams: (state, payload) => {
      return state.update('list', list =>
        list.set('params', im.fromJS(payload)).set('loading', false)
      )
    },
    setParamsdoc: (state, payload) => {
      return state.update('doclist', list =>
        list.set('params', im.fromJS(payload)).set('loading', false)
      )
    }
  },
  effects: {
    login(data, rootState) {
      return axios.post('/user/login', data)
    },
    async query(params, rootState) {
      let newParams = Object.assign(
        rootState.project.getIn(['list', 'defaultParams']).toJS(),
        params
      )
      newParams.nid = localStorage.getItem('activeMenu')
      this.loading()
      const data = await axios.get('/project/list', { params: newParams })
      this.list(data)
      this.setParams(newParams)
    },
    async querydoc(params, rootState) {
      let newParams = Object.assign(
        rootState.project.getIn(['doclist', 'defaultParams']).toJS(),
        params
      )
      this.loadingdoc()
      const data = await axios.get('/document/list', { params: newParams })
      this.doclist(data)
      this.setParamsdoc(newParams)
    },
    saveProject(data, rootState) {
      data.nid = localStorage.getItem('activeMenu')
      return axios.post('/project/save', data)
    }
  }
}

import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  regionsDate: []
})

export default {
  state: initialState,
  reducers: {
    setRegionsDate: (state, payload) => {
      return state.set('regionsDate', im.fromJS(payload))
    }
  },
  effects: {
    // 查询行政区域
    queryRegions(data, rootState) {
      axios.post('/regions/query').then(res => {
        this.setRegionsDate(res)
      })
    }
  }
}

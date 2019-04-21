import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  spacelist: [],
  ...window.__INITIAL_STATE__
})

export default {
  state: initialState,
  reducers: {
    setSpaceList: (state, payload) => {
      return state.set('spacelist', im.fromJS(payload))
    }
  },
  effects: {
    async querySpace(data, rootState) {
      const space = await axios.post('/space/list')
      this.setSpaceList(space)
    }
  }
}

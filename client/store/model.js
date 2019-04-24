import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  spacelist: [],
  activeMenu: '',
  ...window.__INITIAL_STATE__
})

export default {
  state: initialState,
  reducers: {
    setSpaceList: (state, payload) => {
      return state.set('spacelist', im.fromJS(payload))
    },
    setActiveMenu: (state, payload) => {
      return state.set('activeMenu', payload)
    }
  },
  effects: {
    async querySpace(data, rootState) {
      const space = await axios.post('/space/list')
      if (!localStorage.getItem('activeMenu')) {
        this.setActiveMenu(space[0].id)
        localStorage.setItem('activeMenu', space[0].id)
      } else {
        this.setActiveMenu(localStorage.getItem('activeMenu'))
      }
      this.setSpaceList(space)
    }
  }
}

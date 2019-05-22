import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  spacelist: [],
  activeMenu: '',
  modal: {
    visible: false,
    currentRecord: {},
    loading: false
  },
  user: {},
  ...window.__INITIAL_STATE__
})

export default {
  state: initialState,
  reducers: {
    showModal: (state, payload = {}) => {
      return state.update('modal', modal =>
        modal.set('visible', true).set('currentRecord', im.fromJS(payload))
      )
    },
    hideModal: (state, payload) => {
      return state.update('modal', modal => modal.set('visible', false).set('loading', false))
    },
    setSpaceList: (state, payload) => {
      return state.set('spacelist', im.fromJS(payload))
    },
    setActiveMenu: (state, payload) => {
      return state.set('activeMenu', payload)
    },
    setUser: (state, payload) => {
      return state.set('user', im.fromJS(payload))
    }
  },
  effects: {
    async querySpace(data, rootState) {
      const space = await axios.get('/space/list')
      if (!localStorage.getItem('activeMenu')) {
        localStorage.setItem('activeMenu', space[0].id)
        this.setActiveMenu(space[0].id)
      } else {
        this.setActiveMenu(localStorage.getItem('activeMenu'))
      }
      this.setSpaceList(space)
    },
    saveSpace(data, rootState) {
      axios.post('/space/save', data).then(res => {
        this.querySpace()
      })
    }
  }
}

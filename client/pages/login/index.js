import Login from './components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const login = state.login
  return {
    login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.login,
      ...dispatch.common
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

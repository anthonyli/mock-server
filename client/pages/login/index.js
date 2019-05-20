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
      ...dispatch.login
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

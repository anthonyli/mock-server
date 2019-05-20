import Profile from '../components/profile'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const user = state.user
  return {
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.user
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

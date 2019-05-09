import Add from '../components/add'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const document = state.document
  const common = state.common
  return {
    document,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.document,
      ...dispatch.common
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

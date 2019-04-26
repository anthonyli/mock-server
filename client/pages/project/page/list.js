import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const project = state.project
  const common = state.common
  return {
    project,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.project,
      ...dispatch.common
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTable)

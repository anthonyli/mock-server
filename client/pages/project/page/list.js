import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const project = state.project
  return {
    project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.project
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTable)
